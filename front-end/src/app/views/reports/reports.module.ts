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
  
} from '@nebular/theme';
import { TablesRoutingModule, routedComponents } from '../../pages/tables/tables-routing.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { PackagesOnARouteComponent } from './packages-on-a-route/packages-on-a-route.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { StatusCardComponent } from './status-card/status-card.component';

@NgModule({
  declarations: [
    ReportsComponent,
    PackagesOnARouteComponent,
    Report2Component,
    Report3Component,
    StatusCardComponent
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
  ]
})
export class ReportsModule { }
