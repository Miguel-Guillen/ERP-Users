import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  myPerfil: any[] = [];
  loginInvalid: boolean | undefined

  validation_messages = {
    email: [
      { type: 'required', message: 'Ingrese su correo' },
      { type: "pattern", message: "Su correo no valido"}
    ],
    password: [
      { type: 'required', message: 'Ingrese su contraseña' }
    ]
  }

  constructor(private formB: FormBuilder, private _service: AuthService,
    private route: Router, private toast: ToastrService) {
      this.loginForm = this.formB.group({
        email: new FormControl ("", Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ])),
        password: new FormControl ("", Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ]))
      })
    }

  ngOnInit(): void {
  }

  login(values: any){
    if(this.loginForm.valid){
      const email = values.email;
      const password = values.password;
      this.myPerfil = [];
      this._service.get(email, password).subscribe((res: any) => {
        res.forEach((element: any) => {
          this.myPerfil.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        const credentials = {
          id: this.myPerfil[0].id,
          email: this.myPerfil[0].email,
          rol: this.myPerfil[0].rol
        }
        if(this.myPerfil.length == 0) {
          this.loginInvalid = true;
          this.toast.warning('El correo o la contraseña no son correctos', 
          'Datos incorrectos', { positionClass: 'toast-bottom-right' })
        }else {
          this.loginForm.reset();
          localStorage.setItem('user', JSON.stringify(credentials));
          this.route.navigate(['dashboard']);
        }
      })
    }else {
      this.loginInvalid = true;
      this.toast.warning('Los campos estan vacios', 'Datos invalidos', 
      { positionClass: 'toast-bottom-right' })
    }
  }

}
