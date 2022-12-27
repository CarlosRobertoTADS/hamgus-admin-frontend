import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { EstablishmentModel } from 'src/app/models/establishment';
import { MenuModel } from 'src/app/models/menuModel';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentsService {
  private establishmentCollection: CollectionReference<DocumentData>;
  private menuEstablishment: CollectionReference<DocumentData>;
  
  constructor(private firestore: Firestore) {
   this.establishmentCollection = collection(this.firestore, 'headquarters/1/establishments'); //retornar estabelecimentos da matriz
  }

  //Listar todos estabelecimentos
  getAllEstablishments() {
    return collectionData(this.establishmentCollection, {
      idField: 'id',
    }) as Observable<EstablishmentModel[]>;
  }

  getId(id: string) {
    const establishmentDocumentReference = doc(this.firestore, `headquarters/1/establishments/${id}`);
    return docData(establishmentDocumentReference, { idField: 'id' });
  }

  getMenu(id: string) {
    this.menuEstablishment = collection(this.firestore, `headquarters/1/establishments/${id}/menu`);
    return collectionData(this.menuEstablishment, {
      idField: 'id',
    }) as Observable<MenuModel[]>;
  }

  getIdMenu(id: string, idEstablishment:string) {
    const establishmentDocumentReference = doc(this.firestore, `headquarters/1/establishments/${idEstablishment}/menu/${id}`);
    return docData(establishmentDocumentReference, { idField: 'id' });
  }
  //Criar novo estabelecimento
    create(establishment: EstablishmentModel) {
    return addDoc(this.establishmentCollection, establishment);
  }



  update(establishment: EstablishmentModel) {
    const establishmentDocumentReference = doc(
      this.firestore,
      `headquarters/1/establishments/${establishment.id}`
    );
    return updateDoc(establishmentDocumentReference, { ...establishment });
  }

   //Criar novo produto para o menu do estabelecimento
   createProduct(product: MenuModel, id:string) {
    this.menuEstablishment = collection(this.firestore, `headquarters/1/establishments/${id}/menu`);
    return addDoc(this.menuEstablishment, product);
  }

  updateProduct(product: MenuModel, establishmentId:string) {
    const establishmentDocumentReference = doc(
      this.firestore,
      `headquarters/1/establishments/${establishmentId}/menu/${product.id}`
    );
    return updateDoc(establishmentDocumentReference, { ...product });
  }

  delete(id: string) {
    const establishmentDocumentReference = doc(this.firestore, `headquarters/1/establishments/${id}`);
    return deleteDoc(establishmentDocumentReference);
  }


}
