import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepRoutingModule } from './recep-routing.module';
import { RecepComponent } from './recep.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';


@NgModule({
  declarations: [
    RecepComponent
  ],
  imports: [
    CommonModule,
    RecepRoutingModule,
    NbMenuModule,
    ThemeModule

  ]
})
export class RecepModule { }
