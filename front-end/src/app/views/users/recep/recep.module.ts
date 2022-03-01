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
  NbSidebarModule,
  NbRadioModule
} from '@nebular/theme';
import { CreateClientComponent } from './create-client/create-client.component';
import { EnterPackageComponent } from './enter-package/enter-package.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DeliverPackageComponent } from './deliver-package/deliver-package.component';
import { DeliverButtonComponent } from './deliver-package/deliver-button/deliver-button.component';

@NgModule({
  declarations: [
    RecepComponent,
    ClientListComponent,
    CreateClientComponent,
    EnterPackageComponent,
    InvoiceComponent,
    DeliverPackageComponent,
    DeliverButtonComponent
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
    Ng2SmartTableModule,
    NbRadioModule

  ]
})
export class RecepModule { }
