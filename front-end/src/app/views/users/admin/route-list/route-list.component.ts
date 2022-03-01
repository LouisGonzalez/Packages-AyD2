import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Destination } from '../../others/models/destination';
import { DestinationService } from '../../others/services/destination/destination.service';
import { RouteService } from '../../others/services/route/route.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      active: {
        title: 'Estado',
        type: 'string',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      destination: {
        title: 'Destino',
        type: 'string',
      },
      packageOnRoute: {
        title: 'Paquetes en Ruta',
        type: 'number',
      },
    },
    defaultStyle: false,
    actions: {
      columnTitle: 'Acciones',
      
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editRoute', title: '<i class="nb-edit"></i>' },
        { name: 'deleteRoute', title: '<i class="	nb-close-circled"></i>' },
      ],
      position: 'right'
    },
  };

  notification : NotificationsComponent;

  source: LocalDataSource = new LocalDataSource();

  dataSelected;

  constructor(
    private api : RouteService,
    private apiDestination : DestinationService,
    private router : Router,
    private toastrService : NbToastrService
  ) { }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getAllRoutes()
  }

  private getAllRoutes() {
    this.api.getAllRoutes()
    .subscribe({
      next:(res) => {
        this.source.load(this.convertRouteList(res));
      },
      error:(err) => {
        this.notification.errors(400, 'Error mientras se obtenia la lista de rutas, vuelve a intentarlo')
      }
    });
  }

  onCustomAction(event){
    switch (event.action) {
      case 'editRoute':
        break;
      case 'deleteRoute':
        if(parseInt(event.data['pakageOnRoute']) > 0) {
          this.notification.showToast(4, 'Error', 'Error no se puede desactivar esta ruta debido a que tiene paquetes en cola.', 3000);
        } else {
          this.desactiveRoute(parseInt(event.data['id']))
        }
        break;
    }
  }

  private desactiveRoute(id : number) {
    this.api.getRoute(id)
    .subscribe({
      next:(res) => {
        if (res.packageOnRoute > 0) {
          this.notification.showToast(4, 'Error', 'Error no se puede desactivar esta ruta debido a que tiene paquetes en cola.', 3000);
        } else {
          res.active = false;
          this.serviceUpdateRoute(res.id, res);  
        }
      },
      error:(err) => {
        if (err.status = 404) {
          this.notification.errors(404, "el destino con el id: " + id);
        } else {
          this.notification.errors(400, "Error mientras se obtenia el destino con el id: " + id) 
        }
      }
    });
  }

  private serviceUpdateRoute(id : number, data){
    this.api.putRoute(data, id)
    .subscribe({
      next:(res) => {
        this.notification.showToast(1, "Desactivado", "La ruta se a desactivado con exito", 3000);
        this.source.reset()
        this.getAllRoutes()
      },
      error:(err) => {
        this.notification.errors(400, "Error mientras se desactivaba la ruta con id: " + id);
      }
    });
  }

  private getDestination(id : number) {
    this.apiDestination.getDestinationById(id)
    .subscribe({
      next:(res) => {
        return res.name;
      },
      error:(err) => {
        if (err.status = 404) {
          this.notification.errors(404, "el destino con el id: " + id);
        } else {
          this.notification.errors(400, "Error mientras se obtenia el destino con el id: " + id) 
        }
      }
    });
  }

  private convertRouteList(data : any) {
    let array = [];
    for (const iterator of data) {
      let name = this.getDestination(parseInt(iterator['destinationId']));
      let newRouteTemplate = {
        id : iterator['id'],
        active : iterator['active'] == 1 || iterator['active'] ? 'Activo' : 'Desactivado',
        name : iterator['name'],
        destination : iterator['destinationId'],
        packageOnRoute : iterator['packagesOnRoute']
      }
      array.push(newRouteTemplate);
    }
    return array;
  }
}
