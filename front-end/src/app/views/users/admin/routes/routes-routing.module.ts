import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../../auth/others/guards/admin.guard';
import { CreateRouteComponent } from './create-route/create-route.component';

const routes: Routes = [
   {
        path: 'create-route',
        component: CreateRouteComponent,
        canActivate: [AdminGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
