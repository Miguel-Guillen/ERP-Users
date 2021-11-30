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
  user = {
    id: '',
    email: '',
    rol: ''
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
          Validators.required
        ])),
        password: new FormControl("", Validators.compose([
          Validators.required
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
      this.employee = values;
      this.employee.createdDate = new Date;
      this._service.add(this.employee).then(() => {
        this.toast.success('El empleado ha sido añadido con exito', 'Empleado añadido', 
        { positionClass: 'toast-bottom-right' })
        this.employeeForm.reset();
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
        { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      , 'Datos invalidos', { positionClass: 'toast-bottom-right' })
    }
  }

  deleteEmployee(id: string){
    this._service.delete(id).then(() => {
      this.toast.info('El empleado ha sido borrado con exito', 'Empleado borrado', 
      { positionClass: 'toast-bottom-right' })
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
      { positionClass: 'toast-bottom-right' });
      console.log(this.employeeForm);
    })
  }

}
