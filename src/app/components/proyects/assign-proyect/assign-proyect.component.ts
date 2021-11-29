import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProyectService } from 'src/app/service/proyect.service';
import { AssignService } from 'src/app/service/assign.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { ToastrService } from 'ngx-toastr';
import { Competitor } from '../../../models/competitor'

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
  competitor = new Competitor;
  competitors: any[] = [];
  tasks: any[] = [];
  id: string = ''
  extras: any[] = [];
  area: string = '';
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _service: AssignService, private formB: FormBuilder,
    private _serviceProyect: ProyectService, private _serviceEmployee: EmployeeService,
    private router: Router, private _serviceTask: TaskService,
    private toast: ToastrService) {
      this.competitorForm = this.formB.group({
        name: new FormControl('', Validators.required),
        id: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        job: new FormControl('', Validators.required),
        rol: new FormControl('', Validators.required)
      })
    }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getProyects();
  }

  getProyects(){
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
      this.competitors = [];
      res.forEach((element: any) => {
        const e = element.payload.doc.data()['idProyect'];
        if(e == this.id){
          this.competitors.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        }
      });
    })
  }

  newCompetitor(values: any){
    if(this.competitorForm.valid){
      this.competitor = values;
      this.competitor.idProyect = this.id;
      this.competitor.createdDate =  new Date
      this._service.add(this.competitor).then(() => {
        this.toast.success('El colaborador ha sido integrado al proyecto'
        ,'Colaborador añadido', { positionClass: 'toast-bottom-right'})
        this.competitorForm.reset();
        this.area = '';
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
        'Error al añadir el colaborador ', { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('Los valores del formulario son invalidos', 
      'Formulario invalido', { positionClass: 'toast-bottom-right' })
      console.log(this.competitorForm)
    }
  }

  deleteCompetitor(id: string){
    this._service.delete(id).then(() => {
      this.toast.info('El colaborado ha sido removido del proyecto con exito',
      'Colaborador removido', { positionClass: 'toast-bottom-right' })
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
      'Error al remover el colaborador', { positionClass: 'toast-bottom-right' })
    })
  }

  info(){
    this._serviceEmployee.get().subscribe((res: any) => {
      const e: any = [];
      this.extras = [];
      res.forEach((element: any) => {
        e.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const employee of e){
        if(employee.area == this.area) this.extras.push(employee)
      }
      if(this.extras.length == 0){
        this.toast.warning('No se encontro ningun empleado que pertenezca a la area seleccionada', 
      'Empleados no encontrados', { positionClass: 'toast-bottom-right' });
      }
    })
  }

  select(id: string, name: string, area: string, job: string){
    this.competitorForm.controls['name'].setValue(name),
    this.competitorForm.controls['id'].setValue(id);
    this.competitorForm.controls['area'].setValue(area);
    this.competitorForm.controls['job'].setValue(job);
  }

  // function for the task

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
