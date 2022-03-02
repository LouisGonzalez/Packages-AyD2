import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { takeWhile } from 'rxjs/operators' ;
import { DestinationService } from '../../users/others/services/destination/destination.service';
import { RouteService } from '../../users/others/services/route/route.service';
import { NotificationsComponent } from '../../users/others/source/notifications/notifications.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-packages-on-a-route',
  templateUrl: './packages-on-a-route.component.html',
  styleUrls: ['./packages-on-a-route.component.scss']
})
export class PackagesOnARouteComponent implements OnInit {

  private alive = true;

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
      add: false,
      edit: false,
      delete: false,
    },
  };

  on = true;

  statusCard: CardSettings = {
    title: 'Estado',
    iconClass: 'nb-checkmark',
    type: 'success',
  };
  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.statusCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.statusCard,
        type: 'success',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  notification : NotificationsComponent;

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private api : RouteService,
    private apiDestination : DestinationService,
    private router : Router,
    private toastrService : NbToastrService,
    private themeService: NbThemeService
  ) { 
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
    this.getAllRoutes()
  }

  private getAllRoutesStatus() {
    this.api.getAllRoutesStatus(this.on)
    .subscribe({
      next:(res) => {
        this.source.reset();
        this.source.load(this.convertRouteList(res));
      },
      error:(err) => {
        this.notification.errors(400, 'Error mientras se obtenia la lista de rutas, vuelve a intentarlo')
      }
    });
  }

  getAllRoutes() {
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

        }
        break;
    }
  }

  status() {
    this.getAllRoutesStatus();
    this.on = !this.on;
    return this.on;
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
        packageOnRoute : iterator['packagesOnRoute'],
        totalPackages : iterator['totalPackages']
      }
      array.push(newRouteTemplate);
    }
    return array;
  }

}
