import { Component, OnInit } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbSearchService, NbToastrService } from '@nebular/theme';
import { CustomServerDataSource } from '../../others/models/CustomServerDataSource';
import { Package } from '../../others/models/Package';
import { RecepService } from '../../others/services/recep.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-trace-package',
  templateUrl: './trace-package.component.html',
  styleUrls: ['./trace-package.component.scss']
})

export class TracePackageComponent implements OnInit {

  notification : NotificationsComponent;
  source: CustomServerDataSource;
  showPerPage = 10;
  pack: Package;

  settings = {
    hideSubHeader: disableDebugTools,
    mode: 'external', 
    noDataMessage: 'No se encontraron paquetes en ruta.',
    pager:{
      display: true,
      perPage: this.showPerPage,
    },
    actions: {
      columnTitle:'Localizar',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'search', title: '<i class="nb-location"></i>' }
      ],
      position: 'left'
    },
    columns: {
      invoice: {
        title: 'No. Factura',
        type: 'number',
        valuePrepareFunction: (invoice) => {
          return `${invoice.id}`;
        }
      },
      description: {
        title: 'Descripcion',
        type: 'number'
      }
    }
  };

  constructor(
    private receptionistService: RecepService,
    private router: Router,
    private searchService: NbSearchService,
    private toastrService: NbToastrService
  ) {
    this.searchService.onSearchSubmit().subscribe((data: any) => {
      this.receptionistService.getPackageByInvoiceId(data.term).subscribe({
        next:(res) => {
          this.source = res;
        }, 
        error:(err) => {
          this.notification.showToast(3,'Error', 'Hubo un error realizando la busqueda.', 3000);
        }
      })
    })
  }

  ngOnInit(): void {
    this.source = this.receptionistService.getAllPackagesOnRoutePaginated();
  }


  public tracePackage(event): void{
    this.router.navigate(['views', 'recep', 'package-info', event.data['id']]);  
  }

}