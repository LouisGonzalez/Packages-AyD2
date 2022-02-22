import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      //Aqui iran los hijos
      {
        path: 'register',
        component: RegisterUserComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
