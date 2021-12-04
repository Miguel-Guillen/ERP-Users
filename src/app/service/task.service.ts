import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

  get(): Observable<any>{
    return this.firestore.collection('task', ref => ref
    .orderBy('createdDate', 'asc')).snapshotChanges()
  }

  getOne(id: string): Observable<any>{
    return this.firestore.collection('task').doc(id).snapshotChanges()
  }

  getActive(id: string): Observable<any>{
    return this.firestore.collection('task', ref => ref
    .where('idProyect', '==', id).orderBy('createdDate', 'asc')).snapshotChanges()
  }

  getMyTasks(id: string): Observable<any>{
    return this.firestore.collection('task', ref => ref
    .where('responsable', '==', id).where('estatus', '==', 'Por hacer')
    .limit(5).orderBy('createdDate', 'asc')).snapshotChanges()  
  }

  add(empleado: any): Promise<any>{
    return this.firestore.collection('task').add(empleado);
  }

  update(id: string, data: any): Promise<any> {
    return this.firestore.collection('task').doc(id).update(data);
  }

  delete(id: string): Promise<any> {
    return this.firestore.collection('task').doc(id).delete()
  }
}
