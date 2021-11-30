import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../models/task'
import { DoneTaskService } from 'src/app/service/done-task.service';

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.component.html',
  styleUrls: ['./send-task.component.css']
})
export class SendTaskComponent implements OnInit {
  idTask: any;
  task: any[] = [];
  doneTaskForm: FormGroup;
  doneTask = new Task;
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private route: ActivatedRoute, private _serviceTask: TaskService,
    private formB: FormBuilder, private toast: ToastrService, 
    private _service: DoneTaskService, private router: Router) {
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
      this.doneTask = this.task[0];
      this.doneTask.estatus = values.estatus;
      if(values.info == '' && values.evidence == ''){
        this._serviceTask.update(this.idTask, this.doneTask).then(() => {
          this.toast.success('La tarea ha sido enviada correctamente'
          ,'Tarea enviada', { positionClass: 'toast-bottom-right'});
          this.router.navigate(['myTasks'])
        }).catch(err => {
          this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
          'Error al enviar la tarea', { positionClass: 'toast-bottom-right' });
        })
      }else {
        this.doneTask.evidence = values.evidence;
        this.doneTask.info = values.info
        this._serviceTask.update(this.idTask, this.doneTask).then(() => {
          this.toast.success('La tarea ha sido enviada correctamente'
          ,'Tarea enviada', { positionClass: 'toast-bottom-right'});
          this.router.navigate(['myTasks'])
        }).catch(err => {
          this.toast.error(`Ha ocurrido un error de tipo ${err}`, 
          'Error al enviar la tarea', { positionClass: 'toast-bottom-right' });
        })
      }
    }else {
      this.toast.warning('Los valores del formulario son invalidos', 
      'Formulario invalido', { positionClass: 'toast-bottom-right' })
      console.log(this.doneTaskForm)
    }
  }
}
