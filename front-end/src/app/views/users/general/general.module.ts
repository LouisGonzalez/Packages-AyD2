import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';

import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
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
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    GeneralComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
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
    ThemeModule
  ]
})
export class GeneralModule { }
