import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module')
          .then(m => m.AdminModule)
      },
      {
        path: 'operator',
        loadChildren: () => import('./operator/operator.module')
          .then(m => m.OperatorModule)
      },
      {
        path: 'recep',
        loadChildren: () => import('./recep/recep.module')
          .then(m => m.RecepModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
