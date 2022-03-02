import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckpointsListComponent } from './checkpoints-list/checkpoints-list.component';
import { OperatorComponent } from './operator.component';
import { PackagesListComponent } from './packages-list/packages-list.component';
import { ProcessPackageComponent } from './process-package/process-package.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorComponent,
    children: [
      {
        path: '',
        component: CheckpointsListComponent
      },
      {
        path: 'packages-list/:id',
        component: PackagesListComponent
      },
      {
        path: 'process-package/:id',
        component: ProcessPackageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
