import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepGuard } from '../../auth/others/guards/recep.guard';
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
        component: ClientListComponent,
        canActivate: [RecepGuard]
      },
      {
        path: 'enter-package',
        component: EnterPackageComponent,
        canActivate: [RecepGuard]
      },
      {
        path: 'trace-package',
        component: TracePackageComponent,
        canActivate: [RecepGuard]
      },
      {
        path: 'package-info/:id',
        component: PackageInfoComponent,
        canActivate: [RecepGuard]
      },
      {
        path: 'deliver-package',
        component: DeliverPackageComponent,
        canActivate: [RecepGuard]
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepRoutingModule { }
