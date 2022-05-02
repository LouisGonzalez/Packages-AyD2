import { Component, OnInit } from '@angular/core';
import { ProgressInfo} from '../../../@core/data/stats-progress-bar';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { RouteService } from '../../users/others/services/route/route.service';
import { NotificationsComponent } from '../../users/others/source/notifications/notifications.component';
import { DatePipe } from '@angular/common';

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
    private toastrService: NbToastrService,
    private datepipe: DatePipe
    ) {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
        };
      });
      this.progressInfoData = [];
      this.getTop(null, null);
  }

  ngOnDestroy() {
    this.alive = true;
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.notification = new NotificationsComponent(this.toastrService);
  }

  getTop(start, end) {
    let filter;
    if (start == null && end == null) {
      filter = {}
    } else if (end == null) {
      filter = {
        start: start
      }
    } else {
      filter = {
        start: start,
        end: end
      }
    }
    this.routeService.getMostPopularRoute(filter)
    .subscribe(
        (res) => {
          this.results = []
          this.results = [...this.results]
          this.progressInfoData = []
          if (res == null || res.length === 0) {
            this.notification.showToast(3, "No hay rutas", "No se encuentran paquetes registrados en el inteervalo inidicado rutas registradas", 3500);
          } else {
            for (const iterator of res) {
              this.addNewTop(iterator[1], Number(iterator[0]), iterator[2]);
            }
            this.results = [...this.results];
          }
        }
    );
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
    if (date.queue == null){
      this.getTop(null, null);
    } else if (date.queue.end == null) {
      let latest_date =this.datepipe.transform(date.queue.start, 'yyyy-MM-dd');
      this.getTop(latest_date, null)
    } else {
      let latest_date_start =this.datepipe.transform(date.queue.start, 'yyyy-MM-dd');
      let latest_date_end =this.datepipe.transform(date.queue.end, 'yyyy-MM-dd');
      this.getTop(latest_date_start, latest_date_end)
    }
  }

}
