import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { DeliverPackageComponent } from './deliver-package/deliver-package.component';
import { EnterPackageComponent } from './enter-package/enter-package.component';
import { RecepComponent } from './recep.component';

const routes: Routes = [
  {
    path: '',
    component: RecepComponent,
    children: [
      {
        path: 'client-list',
        component: ClientListComponent
      },
      {
        path: 'enter-package',
        component: EnterPackageComponent
      },
      {
        path: 'deliver-package',
        component: DeliverPackageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepRoutingModule { }
