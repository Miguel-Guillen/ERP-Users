import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = environment.URL + '/employee/' ;

  constructor(private http: HttpClient) { }

  get(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url);
  }

  getOne(id: string): Observable<Employee[]>{
    const params = `?idEmployee=${id}`;
    return this.http.get<Employee[]>(this.url + params);
  }

  add(empleado: Employee): Promise<any>{
    return this.http.post(this.url ,empleado).toPromise();
  }

  update(id: string, data: Employee): Promise<any> {
    const params = `?idEmployee=${id}`
    return this.http.put(this.url + params, data).toPromise();
  }

  delete(id: string, blnActivo: boolean): Promise<any> {
    const params = `?idEmployee=${id}&blnActivo=${blnActivo}`;
    return this.http.delete(this.url + params).toPromise();
  }

}
