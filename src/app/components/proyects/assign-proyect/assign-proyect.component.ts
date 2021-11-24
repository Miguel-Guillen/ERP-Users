import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProyectService } from 'src/app/service/proyect.service';
import { AssignService } from 'src/app/service/assign.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-proyect',
  templateUrl: './assign-proyect.component.html',
  styleUrls: ['./assign-proyect.component.css']
})
export class AssignProyectComponent implements OnInit {
  proyects: any[] = [];
  proyect: any[] = [];
  search: any;
  competitorForm: FormGroup;
  area: string = ''
  extras: any[] = [];
  competitor: any[] = [];
  tasks: any[] = [];
  id = ''

  constructor(private _service: AssignService, private formB: FormBuilder,
    private _serviceProyect: ProyectService, private _serviceEmployee: EmployeeService,
    private router: Router, private _serviceTask: TaskService,
    private toast: ToastrService) {
      this.competitorForm = this.formB.group({
        name: new FormControl({value: '', disabled: true}, Validators.required),
        area: new FormControl("", Validators.compose([
          Validators.required
        ])),
        rol: new FormControl("", Validators.compose([
          Validators.required
        ]))
      })
    }

  ngOnInit(): void {
    this._serviceProyect.get().subscribe((res: any) => {
      this.proyects = [];
      res.forEach((element: any) => {
        this.proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  getTask(){
    this._serviceTask.get().subscribe((res: any) => {
      const t: any = [];
      this.tasks = [];
      res.forEach((element: any) => {
        t.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const task of t){
        if(task.idProyect == this.id) this.tasks.push(task)
      }
    })
  }

  getProyect(id: string){
    this._serviceProyect.getOne(id).subscribe((res: any) => {
        this.proyect.push({
          id: id,
          ...res.payload.data()
        });
    })
    this.id = id;
    this.getCompetitor();
    this.getTask();
  }

  getCompetitor(){
    this._service.get().subscribe((res: any) => {
      this.competitor = [];
      res.forEach((element: any) => {
        const e = element.payload.doc.data()['idProyect'];
        if(e == this.id){
          this.competitor.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        }
      });
    })
  }

  newCompetitor(values: any){
    if(this.competitorForm.valid){
      const competitor = {
        idProyect: this.id,
        name: values.name,
        area: values.area,
        rol: values.rol,
        createdDate: new Date()
      };
      this._service.add(competitor).then(() => {
        alert("participante añadido exitosamente");
        this.competitorForm.reset();
        this.competitorForm.controls['name'].disable()
      }).catch(err => {
        console.log(err);
      })
    }else {
      console.log("formulario invalido")
      console.log(this.competitorForm)
    }
  }

  deleteCompetitor(id: string){
    this._service.delete(id).then(() => {
      alert("registro eliminado");
    }).catch(err => {
      console.log("ha ocurrido un error al eliminar", err);
    })
  }

  info(){
    this._serviceEmployee.get().subscribe((res: any) => {
      const e: any = [];
      this.extras = [];
      res.forEach((element: any) => {
        e.push({
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          area: element.payload.doc.data()['area']
        });
      });
      for(const employee of e){
        if(employee.area == this.area) this.extras.push(employee)
      }
      if(this.extras.length > 0) this.competitorForm.controls['name'].enable()
      else console.log("no se encuentra ningun empleado en esa area")
    })
  }

  task(){
    this.router.navigate([`task/${this.id}`]);
  }

  editTask(id: string){
    this.router.navigate([`editTask/${id}`]);
  }

  deleteTask(id: string){
    this._serviceTask.delete(id).then(() => {
      this.toast.info('La tarea ha sido borrada con exito', 'Tarea borrada', {
        positionClass: 'toast-bottom-right' });
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al borrar', {
        positionClass: 'toast-bottom-right' });
    })
  }
}
