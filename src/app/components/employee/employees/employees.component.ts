import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { Employee } from '../../../models/employee'

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  employee = new Employee;
  employees: any[] = [];
  search: any;
  formValid: boolean = true;
  send: boolean = false;
  id = '';
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

  constructor(private _service: EmployeeService, private route: Router,
    private toast: ToastrService, private formB: FormBuilder) {
      this.employeeForm = this.formB.group({
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
    this.getEmployees();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getEmployees(){
    this._service.get().subscribe((res: any) => {
      this.employees = [];
      res.forEach((element: any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  searchEmployee(id: string){
    this.route.navigate([`editEmployee/${id}`]);
  }

  newEmployee(values: any){
    if(this.employeeForm.valid){
      this.send = true;
      this.employee = values;
      this.employee.createdDate = new Date;
      this.employee.password = this._service.encrypt(values.password);
      this._service.add(this.employee).then(() => {
        this.toast.success('El empleado ha sido añadido con exito', 'Empleado añadido', 
        { positionClass: 'toast-bottom-right' })
        this.employeeForm.reset();
        this.send = false;
        this.formValid = true;
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
        { positionClass: 'toast-bottom-right' });
        this.send = false;
        this.formValid = true;
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      ,'Datos invalidos', { positionClass: 'toast-bottom-right' })
      this.formValid = false;
    }
  }

  deleteEmployee(){
    this._service.delete(this.id).then(() => {
      this.toast.info('El empleado ha sido borrado con exito', 'Empleado borrado', 
      { positionClass: 'toast-bottom-right' })
      this.id = '';
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
      { positionClass: 'toast-bottom-right' });
      console.log(this.employeeForm);
    })
  }

  reset(){
    this.employeeForm.reset();
  }

}
