import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EstablishmentsComponent } from './containers/establishments.component';
import { NewEstablishmentComponent } from './containers/new-establishment/new-establishment.component';
import { EstablishmentDetailComponent } from './containers/establishment-detail/establishment-detail.component';
import { NewProductComponent } from './containers/new-product/new-product.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';

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
    path: 'detail/:id',
    component: EstablishmentDetailComponent
  },
  {
    path: 'detail/:id/new-product',
    component: NewProductComponent
  },
  {
    path: 'detail/:id/new-product/:idProduct',
    component: ProductDetailComponent
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
