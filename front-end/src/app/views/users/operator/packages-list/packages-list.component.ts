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

  settings = {
    noDataMessage: 'No hay ningun paquete por procesar en este punto de control.',
    actions: {
      columnTitle:'Procesar',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'process', title: '<i class="nb-compose"></i>' }
      ]
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      description: {
        title: 'Descripcion del Paquete',
        type: 'string',
      }
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
    this.receptionistService.getPackagesOnCheckpoint(Number(this.route.snapshot.paramMap.get('id'))).subscribe(response => {
      this.source.load(this.convertData(response));
    })
  }

  public processPackage(event): void{
    this.router.navigate(['views', 'operator', 'process-package', event.data['id']]);
  }

  public goBack(){
    this.router.navigate(['views', 'operator']);
  }

  private convertData(data : any) {
    let array = [];
    for (const iterator of data) {
      let newData  = {
        id : iterator['packages'].id,
        description: iterator['packages'].description
      }
      array.push(newData);
    }
    return array;
  }
}
