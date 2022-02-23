import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { 
  NbMenuModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbActionsModule,
  NbUserModule,
  NbIconModule,
} from '@nebular/theme';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { RatesComponent } from './rates/rates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { CheckpointListComponent } from './checkpoint-list/checkpoint-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    RatesComponent,
    CreateDestinationComponent,
    CheckpointListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbMenuModule,
    ThemeModule,
    // Agregados 
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    // Modulos necesarios para funciones del formulario
    FormsModule,
    ReactiveFormsModule,
    // Modulos necesarios para la api rest
    HttpClientModule,
    // Modulos necesarios para las tablas
    Ng2SmartTableModule,
  ]
})
export class AdminModule { }
