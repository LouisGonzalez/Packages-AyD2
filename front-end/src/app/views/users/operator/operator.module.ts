import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorComponent } from './operator.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { ProcessPackageComponent } from './process-package/process-package.component';
import { CheckpointsListComponent } from './checkpoints-list/checkpoints-list.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OperatorComponent,
    ProcessPackageComponent,
    CheckpointsListComponent,
    PackagesListComponent
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    NbMenuModule,
    ThemeModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule
  ]
})
export class OperatorModule { }
