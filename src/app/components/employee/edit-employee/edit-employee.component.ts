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
  id: any;
  user = {
    id: '',
    email: '',
    rol: ''
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
      password: new FormControl("", Validators.compose([
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
        password: ''
      })
    })
  }

  editEmployee(values: any){
    if(this.editForm.valid){
      this.employee = values
      this._service.update(this.id ,this.employee).then(() => {
        this.toast.success('El empleado ha sido modificado con exito', 'Empleado modificado', 
        { positionClass: 'toast-bottom-right' })
        this.editForm.reset();
        this.router.navigate(['employee'])
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
        { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      , 'Datos invalidos', { positionClass: 'toast-bottom-right' });
      console.log(this.editForm);
    }
  }

}
