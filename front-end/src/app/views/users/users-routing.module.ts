import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../auth/others/guards/admin.guard';
import { OperatorGuard } from '../auth/others/guards/operator.guard';
import { RecepGuard } from '../auth/others/guards/recep.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module')
          .then(m => m.AdminModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'operator',
        loadChildren: () => import('./operator/operator.module')
          .then(m => m.OperatorModule),
        canActivate: [OperatorGuard]
      },
      {
        path: 'recep',
        loadChildren: () => import('./recep/recep.module')
          .then(m => m.RecepModule),
          canActivate: [RecepGuard]
      },
      {
        path: 'general',
        loadChildren: () => import('./general/general.module')
          .then(m => m.GeneralModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
