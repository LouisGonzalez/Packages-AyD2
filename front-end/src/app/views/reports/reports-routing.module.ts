import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/others/guards/admin.guard';
import { PackagesOnARouteComponent } from './packages-on-a-route/packages-on-a-route.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
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
      {
        path: 'report-2',
        component: Report2Component,
        canActivate: [AdminGuard]
      },
      {
        path: 'report-3',
        component: Report3Component,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
