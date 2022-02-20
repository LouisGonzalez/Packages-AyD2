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
        path: 'auth2',
        loadChildren: () => import('./auth/auth.module')
          .then(m => m.AuthModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module')
          .then(m => m.UsersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
