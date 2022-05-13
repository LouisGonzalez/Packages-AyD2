import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Client } from '../../../users/others/models/Client';
import { ReportService } from '../../../users/others/services/report.service';
import { PackagesComponent } from '../packages/packages.component';

@Component({
  selector: 'ngx-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('container2', { read: ViewContainerRef })
  container2!: ViewContainerRef;

  @Input() clientReceive: Client;
  @Input() equis: any;

  settings2 = {
    actions: {
      columnTitle: 'Ver paquetes',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'seeDetails', title: '<i class="nb-list"></i>' }
    ],
      position: 'right'
    },
    columns: {
      id: {
        title: 'No. Factura',
        type: 'number'
      },
      dateEmit: {
        title: 'Fecha de emision',
        type: 'string'
      },
      total: {
        title: 'Total',
        type: 'number',
        valuePrepareFunction: (total) => {
          return `Q. ${total}`
        }
      },
    }
  }

  source: LocalDataSource = new LocalDataSource();

  constructor(private reportService: ReportService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  getInvoices(){
    this.source.load(this.clientReceive.myInvoices)
  }

  onCustomAction(event){
    console.log(event.data)
    const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(PackagesComponent);
    const componentRef = this.container2.createComponent(dynamicComponentFactory);
    componentRef.instance.invoiceReceive = event.data;
    document.getElementById('table-invoices').style.display = "none";

  }

  //vuelve a la pagina inicial
  back(){
    this.router.navigate(['/views/reports/report-3']);
  }

  ngOnInit(): void {
    this.getInvoices();
  }

}
