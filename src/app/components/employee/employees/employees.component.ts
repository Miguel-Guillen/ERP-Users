import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  editForm: FormGroup;
  formValid: boolean | undefined;
  employees: any[] = [];
  id: string = '';

  constructor(private formB: FormBuilder, private _service: EmployeeService) {
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
      password: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })

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
    this.getEmployees();
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
    this._service.getOne(id).subscribe((res: any) => {
      this.editForm.setValue({
        name: res.payload.data()['name'],
        surnames: res.payload.data()['surnames'],
        job: res.payload.data()['job'],
        area: res.payload.data()['area'],
        password: ''
      })
      this.id = id;
    })
  }

  newEmployee(values: any){
    if(this.employeeForm.valid){
      const employee = {
        name: values.name,
        surnames: values.surnames,
        job: values.job,
        area: values.area,
        password: values.password,
        createdDate: new Date()
      };
      this._service.add(employee).then(() => {
        alert("empleado guardado exitosamente");
        this.employeeForm.reset();
      }).catch(err => {
        console.log(err);
      })
    }else {
      console.log("formulario invalido")
    }
  }

  editEmployee(values: any){
    if(this.editForm.valid){
      const employee = {
        name: values.name,
        surnames: values.surnames,
        job: values.job,
        area: values.area,
        password: values.password,
      }
      this._service.update(this.id ,employee).then(() => {
        alert("empleado actualizado exitosamente");
        this.employeeForm.reset();
        this.id = ''
      }).catch(err => {
        console.log(err);
      })
    }else {
      console.log("formulario invalido");
    }
  }

  deleteEmployee(id: string){
    this._service.delete(id).then(() => {
      alert("registro eliminado");
    }).catch(err => {
      console.log("ha ocurrido un error al eliminar", err);
    })
    this.editForm.reset();
  }

}
