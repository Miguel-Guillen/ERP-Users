import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  constructor(private firestore: AngularFirestore) { }

  get(): Observable<any>{
    return this.firestore.collection('proyects', ref => ref
    .orderBy('createdDate', 'asc')).snapshotChanges()
  }

  getOne(id: string): Observable<any>{
    return this.firestore.collection('proyects').doc(id).snapshotChanges()
  }

  getMyProjects(id: string): Observable<any>{
    return this.firestore.collection('proyects', ref => ref
    .where('estatus', '==', 'Activo').where('id', '==', id)
    .limit(4).orderBy('createdDate', 'asc')).snapshotChanges();
  }

  projectsActive(): Observable<any>{
    return this.firestore.collection('proyects', ref => ref
    .where('estatus', '==', 'Activo').orderBy('createdDate', 'asc')).snapshotChanges();
  }

  add(proyect: any): Promise<any>{
    return this.firestore.collection('proyects').add(proyect);
  }

  update(id: string, data: any): Promise<any> {
    return this.firestore.collection('proyects').doc(id).update(data);
  }

  delete(id: string): Promise<any> {
    return this.firestore.collection('proyects').doc(id).delete()
  }
}
