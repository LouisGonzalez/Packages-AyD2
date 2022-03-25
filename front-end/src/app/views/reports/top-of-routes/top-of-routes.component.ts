import { Component, OnInit } from '@angular/core';
import { ProgressInfo} from '../../../@core/data/stats-progress-bar';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { RouteService } from '../../users/others/services/route/route.service';
import { NotificationsComponent } from '../../users/others/source/notifications/notifications.component';

@Component({
  selector: 'ngx-top-of-routes',
  templateUrl: './top-of-routes.component.html',
  styleUrls: ['./top-of-routes.component.scss']
})
export class TopOfRoutesComponent implements OnInit {

  private alive = true;

  progressInfoData: ProgressInfo [];

  results = [];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Ruta';
  yAxisLabel = 'Paquetes';
  colorScheme: any;
  themeSubscription: any;

  notification : NotificationsComponent;

  constructor(
    private theme: NbThemeService,
    private routeService: RouteService,
    private toastrService: NbToastrService
    ) {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
        };
      });
      this.progressInfoData = [];
      this.getTop();
  }

  ngOnDestroy() {
    this.alive = true;
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

  getTop() {
    this.routeService.getMostPopularRoute()
    .subscribe(
        (res) => {
          if (res == null || res.length == 0) {
            this.notification.showToast(3, "No hay rutas", "No se encuentran rutas registradas", 3500);
          } else {
            for (const iterator of res) {
              this.addNewTop(iterator.name, Number(iterator.totalPackages), iterator.destination.name);
            }
            this.results = [...this.results];
          }
        }
    );
    
    
    setTimeout(() => {console.log('joal');}, 8500);
  }

  addNewTop(title, value, destination) {
    this.results.push({
        name: title, 
        value : value
    });
    this.progressInfoData.push({
      title: title,
      value: value,
      description: destination,
      activeProgress: null
    });
  }

  range(date){
    this.addNewTop('Prueba', 85, 'Prueba');
    console.log(date.queue);
  }

}
