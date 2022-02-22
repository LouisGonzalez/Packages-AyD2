import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMenuModule } from '@nebular/theme';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AdminComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbMenuModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
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

  ]
})
export class AdminModule { }
