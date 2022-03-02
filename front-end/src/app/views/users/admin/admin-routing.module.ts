import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateDestinationComponent } from './create-destination/create-destination.component';
import { RatesComponent } from './rates/rates.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CreateCheckpointComponent } from './create-checkpoint/create-checkpoint.component';
import { ActivateUsersComponent } from './activate-users/activate-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { EditCheckpointComponent } from './edit-checkpoint/edit-checkpoint.component';
import { UpdateAssignamentOperatorCheckpointComponent } from './update-assignament-operator-checkpoint/update-assignament-operator-checkpoint.component';
import { CheckpointListComponent } from './checkpoint-list/checkpoint-list.component';
import { ListDestinationsComponent } from './list-destinations/list-destinations.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';
import { RouteListComponent } from './route-list/route-list.component';
import { AdminGuard } from '../../auth/others/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'routes',
        loadChildren: () => import('./routes/routes.module')
          .then(m => m.RoutesModule)
      },
      { // views/admin/rates
        path: 'rates',
        component: RatesComponent,
        canActivate: [AdminGuard]
      },
      { // views/admin/create-destination
        path: 'create-destination',
        component: CreateDestinationComponent,
        canActivate: [AdminGuard]
      },
      //Aqui iran los hijos
      {
        path: 'register',
        component: RegisterUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'list-users',
        component: ListUsersComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'create-checkpoint',
        component: CreateCheckpointComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'activate-users',
        component: ActivateUsersComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'update-user',
        component: UpdateUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'edit-checkpoint/:id',
        component: EditCheckpointComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'update-assignament-operator/:id',
        component: UpdateAssignamentOperatorCheckpointComponent,
        canActivate: [AdminGuard]
      },
      { // views/admin/checkpoints
        path: 'checkpoints',
        component: CheckpointListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'destinations',
        component: ListDestinationsComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'edit-destination/:id',
        component: EditDestinationComponent,
        canActivate: [AdminGuard]
      },
      { // views/admin/routes
        path: 'route-list',
        component: RouteListComponent,
        canActivate: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
