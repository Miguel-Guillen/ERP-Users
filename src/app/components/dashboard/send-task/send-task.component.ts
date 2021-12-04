import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../models/task'
import { DoneTaskService } from 'src/app/service/done-task.service';
import { ProyectService } from 'src/app/service/proyect.service';

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.component.html',
  styleUrls: ['./send-task.component.css']
})
export class SendTaskComponent implements OnInit {
  idTask: any;
  task: any[] = [];
  proyects: any[] = [];
  doneTaskForm: FormGroup;
  doneTask = new Task;
  formValid: boolean = true;
  send: boolean = false;
  format = 'dd/MM/yyyy'
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private route: ActivatedRoute, private _serviceTask: TaskService,
    private formB: FormBuilder, private toast: ToastrService, 
    private _serviceProyect: ProyectService, private router: Router) {
    this.doneTaskForm = this.formB.group({
      estatus: new FormControl ("", Validators.required),
      info: new FormControl (""),
      evidence: new FormControl ("")
    })
  }

  ngOnInit(): void {
    this.idTask = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('user') || '{}')
    this.detailsTask();
    this.getProyects();
  }

  detailsTask(){
    this._serviceTask.getOne(this.idTask).subscribe((res: any) => {
      this.task.push({
        ...res.payload.data()
      });
    })
  }

  sendTask(values: any){
    if(this.doneTaskForm.valid){
      this.send = true;
      this.doneTask = this.task[0];
      this.doneTask.estatus = values.estatus;
      if(values.info == '' && values.evidence == ''){
        this._serviceTask.update(this.idTask, this.doneTask).then(() => {
          this.toast.success('La tarea ha sido enviada correctamente'
          ,'Tarea enviada', { positionClass: 'toast-bottom-right'});
          this.router.navigate(['myTasks']);
          this.send = false;
          this.formValid = true;
        }).catch(err => {
          this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
          'Error al enviar la tarea', { positionClass: 'toast-bottom-right' });
          this.send = false;
          this.formValid = true;
        })
      }else {
        this.doneTask.evidence = values.evidence;
        this.doneTask.info = values.info
        this._serviceTask.update(this.idTask, this.doneTask).then(() => {
          this.toast.success('La tarea ha sido enviada correctamente'
          ,'Tarea enviada', { positionClass: 'toast-bottom-right'});
          this.router.navigate(['myTasks'])
          this.send = false;
          this.formValid = true;
        }).catch(err => {
          this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
          'Error al enviar la tarea', { positionClass: 'toast-bottom-right' });
          this.send = false;
          this.formValid = true;
        })
      }
    }else {
      this.toast.warning('Los valores del formulario son invalidos', 
      'Formulario invalido', { positionClass: 'toast-bottom-right' })
      console.log(this.doneTaskForm)
      this.formValid = false;
    }
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
      for(let j = 0; j < this.task.length; j++){
        for(let i = 0; i < this.proyects.length; i++){
            if(this.task[j].idProyect == this.proyects[i].id) 
            this.task[j].name = this.proyects[i].name;
        }
      }
    })
  }

}
