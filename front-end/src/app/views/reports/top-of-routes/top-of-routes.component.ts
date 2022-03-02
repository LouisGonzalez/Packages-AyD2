import { Component, OnInit } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-top-of-routes',
  templateUrl: './top-of-routes.component.html',
  styleUrls: ['./top-of-routes.component.scss']
})
export class TopOfRoutesComponent implements OnInit {

  private alive = true;

  progressInfoData: ProgressInfo[];

  results = [ ];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Ruta';
  yAxisLabel = 'Paquetes';
  colorScheme: any;
  themeSubscription: any;

  constructor(
    private statsProgressBarService: StatsProgressBarData,
    private theme: NbThemeService
    ) {
      this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
        };
      });
  }

  ngOnDestroy() {
    this.alive = true;
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.progressInfoData = [];
    this.getTop();
  }

  getTop() {
    this.addNewTop('Ruta 1', 500, 'Guatemala');
    this.addNewTop('Ruta 2', 350, 'Quetzaltenango');
    this.addNewTop('Ruta 3', 100, 'San Marcos');
  }

  addNewTop(title, value, description) {
    this.results.push({
      name: title, value : value
    })
    this.progressInfoData.push({
      title: title,
      value: value,
      description: description,
      activeProgress: null
    });
  }

  range(date){
    console.log(date.queue);
  }

}
