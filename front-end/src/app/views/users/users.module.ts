import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { UsersRoutingModule } from './users-routing.module';
import { AdminModule } from './admin/admin.module';
import { OperatorModule } from './operator/operator.module';
import { RecepModule } from './recep/recep.module';

import { NbMenuModule } from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AdminModule,
    OperatorModule,
    RecepModule,
    NbMenuModule
  ]
})
export class UsersModule { }
