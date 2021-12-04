import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  secretKey = '24@e7_8b*2d'

  constructor(private firestore: AngularFirestore) { }

  get(email: string): Observable<any>{
    return this.firestore.collection('empleados', ref => ref
    .where('email', '==', email)).snapshotChanges();
  }

  decrypt(value: string){
    return CryptoJS.AES.decrypt(value, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
