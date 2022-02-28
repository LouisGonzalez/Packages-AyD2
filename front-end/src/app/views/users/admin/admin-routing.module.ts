import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CheckpointListComponent } from './checkpoint-list/checkpoint-list.component';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { RatesComponent } from './rates/rates.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ActivateUsersComponent } from './activate-users/activate-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { EditCheckpointComponent } from './edit-checkpoint/edit-checkpoint.component';
import { UpdateAssignamentOperatorCheckpointComponent } from './update-assignament-operator-checkpoint/update-assignament-operator-checkpoint.component';

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
      { // views/admin/checkpoints
        path: 'checkpoints',       
        component: CheckpointListComponent     
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
        path: 'edit-checkpoint/:id',
        component: EditCheckpointComponent
      },
      {
        path: 'update-assignament-operator/:id',
        component: UpdateAssignamentOperatorCheckpointComponent
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