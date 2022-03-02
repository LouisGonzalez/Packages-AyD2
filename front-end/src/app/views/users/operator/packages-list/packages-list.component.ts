import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Package } from '../../others/models/Package';
import { RecepService } from '../../others/services/recep.service';

@Component({
  selector: 'ngx-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss']
})


export class PackagesListComponent implements OnInit {

  packages: Package[];
  pack: Package;

  settings = {
    actions: {
      columnTitle:'Procesar',
      add: false,
      edit: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-compose"></i>',
      confirmDelete: true
    },
    columns: {
      package: {
        title: 'Paquete',
        type: 'number'
      },
      entryDate: {
        title: 'Fecha de Entrada',
        type: 'string'
      },
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private receptionistService: RecepService,
    private route: ActivatedRoute,
    private router: Router
  ){} 

  ngOnInit(): void {
    this.getPackages();
  }

  public getPackages(){
    this.receptionistService.getPackagesInCheckpoint(Number(this.route.snapshot.paramMap.get('id'))).subscribe(response => {
      this.packages = response;
      this.source.load(this.packages);
    })
  }

  public processPackage(event): void{
    this.router.navigate(['views', 'operator', 'process-package', event.data['id']]);
  }

  public goBack(){
    this.router.navigate(['views', 'operator']);
  }
}
