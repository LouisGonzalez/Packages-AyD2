import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CheckpointListComponent } from './checkpoint-list/checkpoint-list.component';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { RatesComponent } from './rates/rates.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { // views/admin/rates
        path: 'rates',       
        component: RatesComponent     
      }, 
      { // views/admin/create-destination
        path: 'create-destination',       
        component: CreateDestinationComponent     
      }, 
      { // views/admin/checkpoints
        path: 'checkpoints',       
        component: CheckpointListComponent     
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
