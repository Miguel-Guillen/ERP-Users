import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  constructor(private firestore: AngularFirestore) { }

  get(): Observable<any>{
    return this.firestore.collection('competitor', ref => ref
    .orderBy('createdDate', 'asc')).snapshotChanges()
  }

  // getOne(id: string): Observable<any>{
  //   return this.firestore.collection('empleados').doc(id).snapshotChanges()
  // }

  add(empleado: any): Promise<any>{
    return this.firestore.collection('competitor').add(empleado);
  }

  // update(id: string, data: any): Promise<any> {
  //   return this.firestore.collection('empleados').doc(id).update(data);
  // }

  delete(id: string): Promise<any> {
    return this.firestore.collection('competitor').doc(id).delete()
  }
}