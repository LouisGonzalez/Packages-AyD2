import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { RatesComponent } from './rates/rates.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ActivateUsersComponent } from './activate-users/activate-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';

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
      //Aqui iran los hijos
      {
        path: 'register',
        component: RegisterUserComponent
      },
      {
        path: 'list-users',
        component: ListUsersComponent
      },
      {
        path: 'activate-users',
        component: ActivateUsersComponent
      },
      {
        path: 'update-user',
        component: UpdateUserComponent
      },
      {
        path: 'routes',
        loadChildren: () => import('./routes/routes.module')
          .then(m => m.RoutesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

