import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { RecepComponent } from './recep.component';

const routes: Routes = [
  {
    path: '',
    component: RecepComponent,
    children: [
      {
        path: 'client-list',
        component: ClientListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepRoutingModule { }
