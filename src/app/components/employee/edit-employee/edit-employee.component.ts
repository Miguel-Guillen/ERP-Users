import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  editForm: FormGroup;
  employee = new Employee;
  send: boolean = false;
  formValid: boolean = true;
  id: any;
  user = {
    id: '',
    email: '',
    rol: ''
  }

  validation_messages = {
    name: [
      { type: 'required', message: 'Nombre requerido' }
    ],
    surnames: [
      { type: 'required', message: 'Apellidos requeridos' }
    ],
    job: [
      { type: 'required', message: 'Puesto de trabajo requerido' }
    ],
    area: [
      { type: 'required', message: 'Area de trabajo requerida' }
    ],
    email: [
      { type: 'required', message: 'Correo requerido' },
      { type: "pattern", message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'Contraseña requerida' }
    ],
    rol: [
      { type: 'required', message: 'Privilegios requeridos' }
    ]
  }

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private _service: EmployeeService, private route: ActivatedRoute,
    private router: Router) {
    this.editForm = this.formB.group({
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      surnames: new FormControl("", Validators.compose([
        Validators.required
      ])),
      job: new FormControl("", Validators.compose([
        Validators.required
      ])),
      area: new FormControl("", Validators.compose([
        Validators.required
      ])),
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])),
      rol: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.searchEmployee(this.id);
  }

  searchEmployee(id: string){
    this._service.getOne(id).subscribe((res: any) => {
      this.editForm.setValue({
        name: res.payload.data()['name'],
        surnames: res.payload.data()['surnames'],
        job: res.payload.data()['job'],
        area: res.payload.data()['area'],
        email: res.payload.data()['email'],
        rol: res.payload.data()['rol'],
        password: ''
      })
    })
  }

  editEmployee(values: any){
    if(this.editForm.valid){
      this.send = true;
      this.employee = values
      this.employee.password = this._service.encrypt(values.password);
      this._service.update(this.id ,this.employee).then(() => {
        this.toast.success('El empleado ha sido modificado con exito', 'Empleado modificado', 
        { positionClass: 'toast-bottom-right' })
        this.editForm.reset();
        this.send = false;
        this.formValid = true;
        this.router.navigate(['employee'])
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
        { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      , 'Datos invalidos', { positionClass: 'toast-bottom-right' });
      this.formValid = false;
      console.log(this.editForm);
    }
  }

}
