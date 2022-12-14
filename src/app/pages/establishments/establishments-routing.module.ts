import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstablishmentsComponent } from './containers/establishments.component';
import { NewEstablishmentComponent } from './containers/new-establishment/new-establishment.component';
import { EstablishmentDetailComponent } from './containers/establishment-detail/establishment-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EstablishmentsComponent
  },
  {
    path: 'new',
    component: NewEstablishmentComponent
  },
  {
    path: 'detail',
    component: EstablishmentDetailComponent
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
