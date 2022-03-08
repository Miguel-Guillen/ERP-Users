import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.URL + '/login/';

  constructor(private http: HttpClient) { }

  login(data: Auth): Promise<any>{
    return this.http.post(this.url, data).toPromise();
  }

}
