import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepComponent } from './recep.component';

const routes: Routes = [
  {
    path: '',
    component: RecepComponent,
    children: [
      //Aqui iran los hijos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepRoutingModule { }
