import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DestinationService } from '../../users/others/services/destination/destination.service';
import { RouteService } from '../../users/others/services/route/route.service';
import { NotificationsComponent } from '../../users/others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-packages-on-a-route',
  templateUrl: './packages-on-a-route.component.html',
  styleUrls: ['./packages-on-a-route.component.scss']
})
export class PackagesOnARouteComponent implements OnInit {

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
      totalPackages: {
        title: 'Paquetes Salidos',
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

  constructor(
    private api : RouteService,
    private apiDestination : DestinationService,
    private router : Router,
    private toastrService : NbToastrService
  ) { }

  ngOnInit(): void {
  }

  onCustomAction(event){
    switch (event.action) {
      case 'editRoute':
        break;
      case 'deleteRoute':
        if(parseInt(event.data['pakageOnRoute']) > 0) {
          this.notification.showToast(4, 'Error', 'Error no se puede desactivar esta ruta debido a que tiene paquetes en cola.', 3000);
        } else {

        }
        break;
    }
  }

}
