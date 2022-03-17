import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbRadioModule,
  NbButtonModule,
  NbLayoutModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbInputModule,
  NbCheckboxModule,
  NbMenuModule,
  NbActionsModule,
  NbSpinnerModule,
  NbTreeGridModule,
  NbToggleModule,
  NbSearchModule,
  NbPopoverModule,
  NbSidebarModule,
  NbDatepickerModule

} from '@nebular/theme';
import { TablesRoutingModule, routedComponents } from '../../pages/tables/tables-routing.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PackagesOnARouteComponent } from './packages-on-a-route/packages-on-a-route.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TopOfRoutesComponent } from './top-of-routes/top-of-routes.component';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ProfitsPerRouteComponent } from './profits-per-route/profits-per-route.component';

@NgModule({
  declarations: [
    ReportsComponent,
    PackagesOnARouteComponent,
    Report2Component,
    Report3Component,
    TopOfRoutesComponent,
    ProfitsPerRouteComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NbRadioModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbInputModule,
    NbCheckboxModule,
    NbMenuModule,
    NbActionsModule,
    NbSpinnerModule,
    NbToggleModule,
    NbSearchModule,
    NbPopoverModule,
    NbSidebarModule,
    NbTreeGridModule,
    TablesRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    NbDatepickerModule
  ]
})
export class ReportsModule { }
