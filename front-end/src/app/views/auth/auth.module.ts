import { NgModule } from '@angular/core';
import {
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
    FormsModule

  ],
  declarations: [
    AuthComponent,
    LoginComponent,
  ]
})
export class AuthModule { }
