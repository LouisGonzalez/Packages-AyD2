import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbAlertModule,
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
  NbCheckboxModule
} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NbAuthModule } from '@nebular/auth';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './login/login.component';
import { ChartModule } from 'angular2-chartjs';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule } from '@angular/forms';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    CommonModule,
    NbAuthModule,
    NbInputModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ThemeModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbLayoutModule,
    ChartModule,
    LeafletModule,
    NbActionsModule,
    NbAlertModule,
    FormsModule

  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
  ]
})
export class AuthModule { }
