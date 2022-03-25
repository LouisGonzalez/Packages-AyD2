import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Package } from '../../others/models/Package';
import { RecepService } from '../../others/services/recep.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';
import { DeliverButtonComponent } from './deliver-button/deliver-button.component';

@Component({
  selector: 'ngx-deliver-package',
  templateUrl: './deliver-package.component.html',
  styleUrls: ['./deliver-package.component.scss']
})
export class DeliverPackageComponent implements OnInit {

  packages: Package[];
  pack: Package;
  notification: NotificationsComponent;

  settings = {
    actions: {
      columnTitle:'Entregar',
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-checkmark"></i>',
      confirmDelete: true
    },
    columns: {
      noInvoice: {
        title: 'No. Factura',
        type: 'number'
      },
      description: {
        title: 'Descripcion',
        type: 'number'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private recepService: RecepService, private toastrService: NbToastrService) {
    this.getData();
  }

  startTest(){
    console.log('hola mundooo');
  }

  getData(){
    this.recepService.getPackagesInDest().subscribe(response => {
      this.packages = response;
      for(let i = 0; i < this.packages.length; i++){
        this.packages[i].noInvoice = this.packages[i].invoice.id;
      }
      this.source.load(this.packages);
    })
  }

  deliverPackage(event): void{
    if(window.confirm('¿El paquete ha sido entregado?')){
      this.pack = event.data;
      this.pack.retired = true;
      this.recepService.editRetiredStatePackage(this.pack).subscribe(data => {
        this.notification.showToast(1, 'Entregado', `Paquete marcado como entregado con exito`, 2500);
        this.getData();
      })
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

}
