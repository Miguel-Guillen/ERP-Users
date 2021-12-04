import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  secretKey = '24@e7_8b*2d'

  constructor(private firestore: AngularFirestore) { }

  get(): Observable<any>{
    return this.firestore.collection('empleados', ref => ref
    .orderBy('createdDate', 'asc')).snapshotChanges()
  }

  getOne(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges()
  }

  add(empleado: any): Promise<any>{
    return this.firestore.collection('empleados').add(empleado);
  }

  update(id: string, data: any): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update(data);
  }

  delete(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete()
  }

  encrypt(pass: string): string{
    return CryptoJS.AES.encrypt(pass, this.secretKey.trim()).toString()
  }

}
