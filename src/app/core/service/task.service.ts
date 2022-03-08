import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.URL + '/task/' ;

  constructor(private http: HttpClient) { }

  get(id?: string): Observable<Task[]>{
    if(id == undefined || id == ''){
      return this.http.get<Task[]>(this.url);
    }else {
      const params = `?idProject=${id}`;
      return this.http.get<Task[]>(this.url + params);
    }
  }

  getOne(id: string): Observable<Task[]>{
    const params = `?idTask=${id}`;
    return this.http.get<Task[]>(this.url + params);
  }

  getMyTasks(id: string){
    const params = `?responsable=${id}`;
    return this.http.get<Task[]>(this.url + params);
  }

  add(tarea: Task): Promise<any>{
    return this.http.post(this.url, tarea).toPromise();
  }

  update(id: string, data: Task): Promise<any> {
    const params = `?idTask=${id}`
    return this.http.put(this.url + params, data).toPromise();
  }

  delete(id: string): Promise<any> {
    const params = `?idTask=${id}`;
    return this.http.delete(this.url + params).toPromise();
  }
}
