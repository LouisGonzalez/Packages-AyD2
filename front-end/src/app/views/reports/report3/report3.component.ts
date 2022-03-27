import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Client } from '../../users/others/models/Client';
import { Invoice } from '../../users/others/models/Invoice';
import { ReportService } from '../../users/others/services/report.service';
import { InvoiceComponent } from './invoice/invoice.component';


@Component({
  selector: 'ngx-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.scss']
})
export class Report3Component implements OnInit {


  @ViewChild('containerA', { read: ViewContainerRef })
  containerA!: ViewContainerRef;

  clients: Client[];

  client: Client;
  settings = {
    actions: {
      columnTitle: 'Ver facturas',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'seeDetails', title: '<i class="nb-list"></i>' }
    ],
      position: 'right'
    },
    columns: {
      name: {
        title: 'Nombres',
        type: 'string'
      },
      lastname: {
        title: 'Apellidos',
        type: 'string'
      },
      nit: {
        title: 'NIT',
        type: 'number'
      },
      cui: {
        title: 'CUI',
        type: 'number'
      },
      totalIngresos: {
        title: 'Ingresos (Q.)',
        type: 'number'
      }
    }
  }

  source: LocalDataSource = new LocalDataSource();

  constructor(private reportService: ReportService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.getClients();
  }



  getClients(){
    this.reportService.getAllClients().subscribe(response => {
      this.clients = response;
      for(let i=0; i < this.clients.length; i++){
          this.reportService.getAllInvoices(this.clients[i].nit).subscribe(respInv => {
          if(respInv != null){
            this.clients[i].myInvoices = respInv;
            this.calculateTotalIngresos(i);
            console.log( this.clients[i].totalIngresos)
          }
          this.source.load(this.clients)
        })
      }
    })
  }

  onCustomAction(event): void {
    console.log(event.data)
    const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(InvoiceComponent);
    const componentRef = this.containerA.createComponent(dynamicComponentFactory);
    componentRef.instance.clientReceive = event.data;
    componentRef.instance.equis = "asfasfasdf";
    document.getElementById('table-clients').style.display = "none";
  }

  calculateTotalIngresos(iterador:any){
    let total = 0;
    for(let i = 0; i < this.clients[iterador].myInvoices.length; i++){
      total = total + this.clients[iterador].myInvoices[i].total;
    }
    this.clients[iterador].totalIngresos = total;

  }


  ngOnInit(): void {
  }

}
