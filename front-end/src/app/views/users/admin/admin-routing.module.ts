import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
