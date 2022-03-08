import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyect } from '../models/proyect';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

  url = environment.URL + '/project/';
  url2 = environment.URL + '/task/';

  constructor(private http: HttpClient) { }

  get(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(this.url);
  }

  getOne(id: string): Observable<Proyect[]> {
    const params = `?idProject=${id}`;
    return this.http.get<Proyect[]>(this.url + params);
  }

  getMyProjects(id: string): Observable<any[]> {
    const params = `myTasks/?id=${id}`
    return this.http.get<any[]>(this.url2 + params);
  }

  add(proyect: Proyect): Promise<any> {
    return this.http.post(this.url, proyect).toPromise();
  }

  update(id: string, data: Proyect): Promise<any> {
    const params = `?idProject=${id}`
    return this.http.put(this.url + params, data).toPromise();
  }

  delete(id: string, blnActivo: Boolean): Promise<any> {
    const params = `?idProject=${id}&blnActivo=${blnActivo}`;
    return this.http.delete(this.url + params).toPromise();
  }
}
