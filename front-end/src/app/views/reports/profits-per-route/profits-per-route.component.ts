import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Route } from '../../users/others/models/Route';
import { AdminService } from '../../users/others/services/admin.service';

@Component({
  selector: 'ngx-profits-per-route',
  templateUrl: './profits-per-route.component.html',
  styleUrls: ['./profits-per-route.component.scss']
})
export class ProfitsPerRouteComponent implements OnInit {

  routes: Route[];
  route: Route;

  settings = {
    actions: {
      edit: false,
      add: false,
      delete: false
    },
    columns: {
      name: {
        title: 'Ruta',
        type: 'string'
      },
      income: {
        title: 'Ingresos',
        type: 'number'
      },
      costs: {
        title: 'Costos',
        type: 'number'
      },
      profits: {
        title: 'Ganancias',
        type: 'number'
      }
    }
  }

  source: LocalDataSource = new LocalDataSource();

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private adminService: AdminService) {
    this.getData();
  }

  getData(){
    this.adminService.getAllRoutes().subscribe(response => {
      this.routes = response;
      this.source.load(this.routes)
    })
  }

  ngOnInit(): void {
  }

}
