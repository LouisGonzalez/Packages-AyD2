import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { CustomServerDataSource } from '../../others/models/CustomServerDataSource';
import { Package } from '../../others/models/Package';
import { RecepService } from '../../others/services/recep.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';


@Component({
  selector: 'ngx-deliver-package',
  templateUrl: './deliver-package.component.html',
  styleUrls: ['./deliver-package.component.scss']
})
export class DeliverPackageComponent implements OnInit {

  notification : NotificationsComponent;
  source: CustomServerDataSource;
  showPerPage = 10;
  pack: Package;

  settings = {
    mode: 'external', 
    noDataMessage: 'No hay paquetes en destino actualmente.',
    pager:{
      display: true,
      perPage: this.showPerPage,
    },
    actions: {
      columnTitle:'Entregar',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'removeCheckpoint', title: '<i class="nb-checkmark"></i>' }
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
      },
    }
  };


  constructor(private recepService: RecepService, private toastrService: NbToastrService) {
    this.source = recepService.getAllPackagesAtDestinationPaginated();
  }



  deliverPackage(event): void{
    if(window.confirm('¿El paquete ha sido entregado?')){
      this.pack = event.data;
      this.pack.retired = true;
      this.recepService.editRetiredStatePackage(this.pack).subscribe(data => {
        this.notification.showToast(1, 'Entregado', `Paquete marcado como entregado con exito`, 2500);
        this.source.remove(event.data['id'])
      })
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

}
