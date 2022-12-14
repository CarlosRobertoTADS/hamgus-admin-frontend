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
import { MatInputModule } from '@angular/material/input';
import { EstablishmentsService } from './services/establishments.service';
import { NewEstablishmentComponent } from './containers/new-establishment/new-establishment.component';
import { EstablishmentDetailComponent } from './containers/establishment-detail/establishment-detail.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [EstablishmentsComponent, NewEstablishmentComponent, EstablishmentDetailComponent],
  imports: [
    CommonModule,
    EstablishmentsRoutingModule,
    MatCardModule,
    MatToolbarModule,
    SharedModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule

  ],
  providers: [],

})
export class EstablishmentsModule { }
