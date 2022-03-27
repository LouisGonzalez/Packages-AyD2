import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Invoice } from '../../../users/others/models/Invoice';
import { ReportService } from '../../../users/others/services/report.service';
import { Package } from '../../../users/others/models/Package';

@Component({
  selector: 'ngx-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  @Input() invoiceReceive: Invoice;
  packages: Package[];

  settings = {
    actions: {
      columnTitle: 'Ver detalles',
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },
    columns: {
      onWay: {
        title: 'En camino',
        type: 'boolean'
      },
      atDestination: {
        title: 'En destino',
        type: 'boolean'
      },
      retired: {
        title: 'Retirado',
        type: 'boolean'
      },
      description: {
        title: 'Descripcion',
        type: 'string'
      },
      priority: {
        title: 'Prioridad',
        type: 'boolean'
      },
      weight: {
        title: 'Peso(Kg)',
        type: 'number'
      },
      unitTotal: {
        title: 'Total Unitario (Q.)',
        type: 'number'
      }
    }
  }

  source: LocalDataSource = new LocalDataSource();

  constructor(private reportService: ReportService, private componentFactoryResolver: ComponentFactoryResolver) { }

  getPackages(){
    this.reportService.getPackagesByInvoice(this.invoiceReceive.id).subscribe(response => {
      this.packages = response;
      this.source.load(this.packages)
    })
  }

  close(){
    document.getElementById('table-packages')?.remove();
    document.getElementById('table-invoices').style.display = 'block';
  }

  ngOnInit(): void {
    console.log(this.invoiceReceive+"    asdfasd ")
    this.getPackages();
  }

}
