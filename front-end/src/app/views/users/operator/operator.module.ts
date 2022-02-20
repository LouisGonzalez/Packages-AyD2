import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMenuModule } from '@nebular/theme';
import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './operator.component';
import { ThemeModule } from '../../../@theme/theme.module';


@NgModule({
  declarations: [
    OperatorComponent
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    NbMenuModule,
    ThemeModule

  ]
})
export class OperatorModule { }
