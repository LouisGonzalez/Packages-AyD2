import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorComponent } from './operator.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorComponent,
    children: [
      //Aqui iran los hijos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule { }
