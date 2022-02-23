import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCheckboxModule,
  NbCardModule,
  NbRadioModule, 
  NbButtonModule,
  NbInputModule,
  NbStepperModule,
} from '@nebular/theme';

import { AddRouteComponent } from './add-route/add-route.component';

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule,
    NbCheckboxModule,
    NbCardModule,
    NbRadioModule,
    NbButtonModule,
    NbInputModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddRouteComponent
  ] 

})
export class RoutesModule { }