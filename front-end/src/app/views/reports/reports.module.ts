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
  NbSidebarModule
} from '@nebular/theme';
import { TablesRoutingModule, routedComponents } from '../../pages/tables/tables-routing.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';


@NgModule({
  declarations: [
    ReportsComponent,
    Report2Component,
    Report3Component
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
    ThemeModule

  ]
})
export class ReportsModule { }
