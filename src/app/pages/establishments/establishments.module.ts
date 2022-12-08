import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../../shared/shared.module';
import { EstablishmentsComponent } from './containers/establishments.component';
import { EstablishmentsRoutingModule } from './establishments-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [EstablishmentsComponent],
  imports: [
    CommonModule,
    EstablishmentsRoutingModule,
    MatCardModule,
    MatToolbarModule,
    SharedModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule
  ]
})
export class EstablishmentsModule { }
