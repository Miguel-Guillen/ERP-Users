import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router, private _serviceAuth: AuthService){ }

  async canActivate(){
    const token = localStorage.getItem('user');
    if(!token){
      this.route.navigate(['/login'])
    }
    return true;
  }

  // canActivate(){
  //   return this._serviceAuth.authenticated() ? true : this.route.navigate(['login'])
  // }
  
}
