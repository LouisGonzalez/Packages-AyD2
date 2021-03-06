import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent }  from './views.component'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [

  {
    path: '',
    component: ViewsComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module')
          .then(m => m.AuthModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module')
          .then(m => m.UsersModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module')
          .then(m => m.ReportsModule)
      },
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
