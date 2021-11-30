import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DoneTaskService {

  constructor(private firestore: AngularFirestore) { }

  getById(id: string): Observable<any>{
    return this.firestore.collection('doneTask', ref => ref
    .where('idTask', '==', id)).snapshotChanges()
  }

  add(doneTask: any): Promise<any>{
    return this.firestore.collection('doneTask').add(doneTask);
  }

  update(id: string, data: any): Promise<any> {
    return this.firestore.collection('doneTask').doc(id).update(data);
  }
}
