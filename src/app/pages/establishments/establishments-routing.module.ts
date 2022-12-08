import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstablishmentsComponent } from './containers/establishments.component';

const routes: Routes = [
  {
    path: '',
    component: EstablishmentsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class EstablishmentsRoutingModule {
}
