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
  id: string = '';
  idCompetitor = '';
  idTask = '';
  extras: any[] = [];
  area: string = '';
  formValid: boolean = true;
  send: boolean = false;
  format = 'dd/MM/yyyy';
  user = {
    id: '',
    email: '',
    rol: ''
  }

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es requerido' }
    ],
    area: [
      { type: 'required', message: 'El area es requerida' }
    ],
    job: [
      { type: 'required', message: 'El cargo es requerido' }
    ],
    idEmployee: [
      { type: 'required', message: 'La clave es requerida' }
    ],
    rol: [
      { type: 'required', message: 'El puesto es requerido' }
    ]
  }

  constructor(private _service: AssignService, private formB: FormBuilder,
    private _serviceProyect: ProyectService, private _serviceEmployee: EmployeeService,
    private router: Router, private _serviceTask: TaskService,
    private toast: ToastrService) {
      this.competitorForm = this.formB.group({
        name: new FormControl('', Validators.required),
        area: new FormControl('', Validators.required),
        job: new FormControl('', Validators.required),
        idEmployee: new FormControl('', Validators.required),
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
      this.proyect = [];
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
      this.send = true;
      this.competitor = values;
      this.competitor.idProyect = this.id;
      this.competitor.createdDate = new Date;
      this._service.add(this.competitor).then(() => {
        this.toast.success('El colaborador ha sido integrado al proyecto'
        ,'Colaborador añadido', { positionClass: 'toast-bottom-right'})
        this.competitorForm.reset();
        this.send = false;
        this.formValid = true;
        this.area = '';
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
        'Error al añadir el colaborador ', { positionClass: 'toast-bottom-right' });
        this.send = false;
        this.formValid = true;
      })
    }else {
      this.toast.warning('Los valores del formulario son invalidos', 
      'Formulario invalido', { positionClass: 'toast-bottom-right' })
      console.log(this.competitorForm);
      this.formValid = false;
    }
  }

  deleteCompetitor(){
    this._service.delete(this.idCompetitor).then(() => {
      this.toast.info('El colaborado ha sido removido del proyecto con exito',
      'Colaborador removido', { positionClass: 'toast-bottom-right' })
      this.idCompetitor = '';
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
      'Error al remover el colaborador', { positionClass: 'toast-bottom-right' })
      this.idCompetitor = '';
    })
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

  deleteTask(){
    this._serviceTask.delete(this.idTask).then(() => {
      this.toast.info('La tarea ha sido borrada con exito', 'Tarea borrada', {
        positionClass: 'toast-bottom-right' });
      this.id = '';
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al borrar', {
        positionClass: 'toast-bottom-right' });
    })
  }

  // extras

  info(){
    if(this.area == ''){
      this.formValid = false;
    }else {
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
          this.formValid = true;
        }
        if(this.extras.length == 0){
          this.toast.warning('No se encontro ningun empleado que pertenezca a la area seleccionada', 
          'Empleados no encontrados', { positionClass: 'toast-bottom-right' });
          this.formValid = true;
        }
      })
    }
  }

  select(id: string, name: string, area: string, job: string){
    this.competitorForm.controls['name'].setValue(name);
    this.competitorForm.controls['area'].setValue(area);
    this.competitorForm.controls['idEmployee'].setValue(id),
    this.competitorForm.controls['job'].setValue(job)
  }

  reset(){
    this.competitorForm.reset();
  }
}
