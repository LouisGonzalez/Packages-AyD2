import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { DeliverPackageComponent } from './deliver-package/deliver-package.component';
import { EnterPackageComponent } from './enter-package/enter-package.component';
import { PackageInfoComponent } from './package-info/package-info.component';
import { RecepComponent } from './recep.component';
import { TracePackageComponent } from './trace-package/trace-package.component';

const routes: Routes = [
  {
    path: '',
    component: RecepComponent,
    children: [
      {
        path: '',
        component: DeliverPackageComponent
      },
      {
        path: 'client-list',
        component: ClientListComponent
      },
      {
        path: 'enter-package',
        component: EnterPackageComponent
      },
      {
        path: 'trace-package',
        component: TracePackageComponent
      },
      {
        path: 'package-info/:id',
        component: PackageInfoComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepRoutingModule { }
