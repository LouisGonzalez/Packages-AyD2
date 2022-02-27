import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRouteComponent } from './create-route/create-route.component';

const routes: Routes = [
   {
        path: 'create-route',
        component: CreateRouteComponent,
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
