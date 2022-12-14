import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { EstablishmentModel } from 'src/app/models/establishment';
import { HeadquartersModel } from 'src/app/models/headquarters';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  private establishmentCollection: CollectionReference<DocumentData>;

  
  constructor(private firestore: Firestore) {
   this.establishmentCollection = collection(this.firestore, 'headquarters/1/establishments'); //retornar estabelecimentos da matriz
  }

  //Listar todos estabelecimentos
  getAllEstablishments() {
    return collectionData(this.establishmentCollection, {
      idField: 'id',
    }) as Observable<EstablishmentModel[]>;
  }

  //Criar novo estabelecimento
  create(establishment: EstablishmentModel) {
    return addDoc(this.establishmentCollection, establishment);
  }


}
