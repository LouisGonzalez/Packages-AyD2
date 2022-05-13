import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/others/guards/admin.guard';
import { PackagesOnARouteComponent } from './packages-on-a-route/packages-on-a-route.component';
import { ProfitsPerRouteComponent } from './profits-per-route/profits-per-route.component';
import { Report2Component } from './report2/report2.component';
import { Report3Component } from './report3/report3.component';
import { ReportsComponent } from './reports.component';
import { TopOfRoutesComponent } from './top-of-routes/top-of-routes.component';

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
        component: ProfitsPerRouteComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'report-3',
        component: Report3Component,
        canActivate: [AdminGuard]
      },
      {
        path: 'report-4',
        component: TopOfRoutesComponent,
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
