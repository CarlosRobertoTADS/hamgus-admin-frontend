import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EstablishmentModel } from 'src/app/models/establishment';


@Injectable({
  providedIn: 'root'
})
export class EstablishmentsServiceService {
  private establishmentCollection: CollectionReference<DocumentData>;

  
  constructor(private firestore: Firestore) {
    this.establishmentCollection = collection(this.firestore, 'establishment');
  }

  getAll() {
    return collectionData(this.establishmentCollection, {
      idField: 'id',
    }) as Observable<EstablishmentModel[]>;
  }


}
