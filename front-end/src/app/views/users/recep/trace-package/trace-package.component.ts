import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Package } from '../../others/models/Package';
import { RecepService } from '../../others/services/recep.service';

@Component({
  selector: 'ngx-trace-package',
  templateUrl: './trace-package.component.html',
  styleUrls: ['./trace-package.component.scss']
})

export class TracePackageComponent implements OnInit {

  packages: Package[];
  pack: Package;

  settings = {
    actions: {
      columnTitle:'Ver',
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-search"></i>',
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
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private receptionistService: RecepService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  public getPackages(){
    this.receptionistService.getAllPackages().subscribe(response => {
      this.packages = response;
      this.source.load(this.packages);
    })
  }

  public tracePackage(event): void{
    this.router.navigate(['views', 'recep', 'package-info', event.data['id']]);  
  }

}