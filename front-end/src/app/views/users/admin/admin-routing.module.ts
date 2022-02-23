import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { RatesComponent } from './rates/rates.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RegisterUserComponent } from './register-user/register-user.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
