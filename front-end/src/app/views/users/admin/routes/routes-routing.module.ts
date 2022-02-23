import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRouteComponent } from './add-route/add-route.component';

const routes: Routes = [
   {
        path: 'add-route',
        component: AddRouteComponent,
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
