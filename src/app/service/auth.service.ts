import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore) { }

  get(email: string, password: string): Observable<any>{
    return this.firestore.collection('empleados', ref => ref
    .where('email', '==', email).where('password', '==', password)).snapshotChanges();
  }

}
