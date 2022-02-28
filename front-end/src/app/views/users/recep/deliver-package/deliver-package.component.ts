import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Package } from '../../others/models/Package';
import { RecepService } from '../../others/services/recep.service';
import { DeliverButtonComponent } from './deliver-button/deliver-button.component';

@Component({
  selector: 'ngx-deliver-package',
  templateUrl: './deliver-package.component.html',
  styleUrls: ['./deliver-package.component.scss']
})
export class DeliverPackageComponent implements OnInit {

  packages: Package[];
  pack: Package;

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
      // unitTotal: {
      //   title: 'desactivar',
      //   type: 'custom',
      //   renderComponent: DeliverButtonComponent,
      //   onComponentInitFunction(instance){
      //     instance.clickOne.subscribe(row => {
      //       console.log(row)
      //     })
      //   }
      // }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private recepService: RecepService) {
    this.getData();
  }

  startTest(){
    console.log('hola mundooo');
  }

  getData(){
    this.recepService.getPackagesInDest().subscribe(response => {
      this.packages = response;
      this.source.load(this.packages);
    })
  }

  deliverPackage(event): void{
    if(window.confirm('¿El paquete ha sido entregado?')){
      this.pack = event.data;
      this.pack.retired = true;
      this.recepService.editRetiredStatePackage(this.pack).subscribe(data => {
        this.getData();
      })
    } else {
      event.confirm.reject();
    }
  }

  ngOnInit(): void {
  }

}
