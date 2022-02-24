import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepRoutingModule } from './recep-routing.module';
import { RecepComponent } from './recep.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
  NbActionsModule,
  NbSearchModule,
  NbPopoverModule,
  NbSidebarModule
} from '@nebular/theme';
import { CreateClientComponent } from './create-client/create-client.component';
import { EnterPackageComponent } from './enter-package/enter-package.component';


@NgModule({
  declarations: [
    RecepComponent,
    ClientListComponent,
    CreateClientComponent,
    EnterPackageComponent
  ],
  imports: [
    CommonModule,
    RecepRoutingModule,
    NbMenuModule,
    ThemeModule,
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
    NbSearchModule,
    NbPopoverModule,
    NbSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule

  ]
})
export class RecepModule { }
