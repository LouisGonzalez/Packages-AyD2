import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { takeWhile } from 'rxjs/operators' ;
import { CustomServerDataSource } from '../../users/others/models/CustomServerDataSource';
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
  source: CustomServerDataSource;
  showPerPage = 10;

  settings = {
    mode: 'external', 
    noDataMessage: 'No exite ninguna ruta en el sistema con el estado indicado.',
    pager:{
      display: true,
      perPage: this.showPerPage,
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
    this.getAllRoutes();
  }

  getAllRoutes() {
    this.source = null;
    this.source = this.api.getAllRoutesPaginated();
  }

  private getAllRoutesStatus() {
    this.source = null;
    this.source = this.api.getRoutesByActivePaginated(this.on);
  }

  status() {
    this.on = !this.on;
    this.getAllRoutesStatus();
    return this.on;
  }

}
