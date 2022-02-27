import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesRoutingModule } from './routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { 
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbSearchModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';

import { CreateRouteComponent } from './create-route/create-route.component'; 

@NgModule({
  imports: [
    CommonModule,
    RoutesRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    HttpClientModule,
    NbSearchModule,
    NbListModule,
    NbSpinnerModule
  ],
  declarations: [
    CreateRouteComponent
  ] 

})
export class RoutesModule { }