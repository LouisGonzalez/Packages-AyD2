import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../@theme/theme.module';
import { ViewsRoutingModule } from './views-routing.module';
import { AuthModule } from './auth/auth.module';
import { ViewsComponent } from './views.component';
import { ReactiveFormsModule } from '@angular/forms'
import { NbMenuModule } from '@nebular/theme';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
@NgModule({
  declarations: [
    ViewsComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    AuthModule,
    ThemeModule,
    ReactiveFormsModule,
    NbMenuModule,
    UsersModule,
    ReportsModule,

  ]
})
export class ViewsModule { }
