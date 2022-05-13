import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CustomServerDataSource } from '../../others/models/CustomServerDataSource';
import { RouteService } from '../../others/services/route/route.service';
import { NotificationsComponent } from '../../others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  notification : NotificationsComponent;
  source: CustomServerDataSource;
  showPerPage = 10;

  settings = {
    mode: 'external', 
    noDataMessage: 'No exite ninguna ruta en el sistema.',
    pager:{
      display: true,
      perPage: this.showPerPage,
    },
    actions: {
      columnTitle: 'Acciones',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'editRoute', title: '<i class="nb-edit"></i>' },
        { name: 'deleteRoute', title: '<i class="nb-trash"></i>' },
      ],
      position: 'right'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      active: {
        title: 'Estado',
        type: 'string',
        valuePrepareFunction: (state) => {
          return `${state == 1 ? 'Activa' : 'Desactivada'}`;
        },
      },
      name: {
        title: 'Nombre',
        type: 'string',
        compareFunction: 'sortName'
      },
      destination: {
        title: 'Destino',
        type: 'string',
        valuePrepareFunction: (destination) => {
          return `${destination.name}`;
        }
      },
      packagesOnRoute: {
        title: 'Paquetes en Ruta',
        type: 'number',
      },
    },
  };

  constructor(
    private api : RouteService,
    private router : Router,
    private toastrService : NbToastrService
  ) {}

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.source = this.api.getAllRoutesPaginated2();
  }

  onCustomAction(event){
    if(parseInt(event.data['packagesOnRoute']) > 0){
      this.notification.showToast(4, 'Error', 'No se puede realizar la accion sobre esta ruta debido a que tiene paquetes en ruta.', 3000);
    } else{
      switch (event.action) {
        case 'editRoute':
          this.router.navigate(['views', 'admin', 'edit-route', event.data['id']]);
          break;
        case 'deleteRoute':
          this.deleteRoute(parseInt(event.data['id']))
          break;
      }
    }
  }

  private deleteRoute(id : number) {
    if(window.confirm('¿Eliminar permanentemente la ruta?')){
      this.api.deleteRoute(id).subscribe({
        next:(res) => {
          this.notification.showToast(1, 'Exito', 'Ruta eliminada exitosamente.', 3000);
          this.source.remove(id);
        },  
        error:(error) => {
          this.notification.showToast(3, 'Error', error.error , 4000);
        }
      })
    } 
  }
}