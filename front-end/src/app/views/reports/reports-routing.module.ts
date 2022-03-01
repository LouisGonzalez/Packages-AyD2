import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/others/guards/admin.guard';
import { PackagesOnARouteComponent } from './packages-on-a-route/packages-on-a-route.component';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { // views/reports/report-1
        path: 'report-1',
        component: PackagesOnARouteComponent,
        canActivate: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
