import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { RatesComponent } from './rates/rates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateDestinationComponent } from './create-destination/create-destination.component';

import { RegisterUserComponent } from './register-user/register-user.component';
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
  NbCheckboxModule,
  NbMenuModule,
  NbActionsModule
} from '@nebular/theme';
import { ListUsersComponent } from './list-users/list-users.component';
import { RoutesModule } from './routes/routes.module';

@NgModule({
  declarations: [
    AdminComponent,
    RatesComponent,
    CreateDestinationComponent,
    RegisterUserComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbMenuModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
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
    Ng2SmartTableModule,
    HttpClientModule,
    RoutesModule
  ]
})
export class AdminModule { }
