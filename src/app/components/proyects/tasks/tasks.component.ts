import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { AssignService } from 'src/app/service/assign.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  task = new Task;
  id: any;
  competitor: any[] = [];
  competitors: boolean = false;

  constructor(private _service: TaskService, private formB: FormBuilder,
    private toast: ToastrService, private route: ActivatedRoute, 
    private _serviceAssign: AssignService) {
      this.taskForm = this.formB.group({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        requirements: new FormControl("", Validators.required),
        image: new FormControl(""),
        priority: new FormControl("", Validators.required),
        dueDate: new FormControl("", Validators.required),
        commentary: new FormControl(""),
        responsable: new FormControl("", Validators.required)
      })
    };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.info();
  }

  newTask(values: any){
    if(this.taskForm.valid){
      this.task = values;
      this.task.createdDate = new Date;
      this.task.priority = 'Por hacer';
      this.task.idProyect = this.id,
      this._service.add(this.task).then(() => {
        this.toast.success('su tarea acaba de ser añadida exitosamente', 'Tarea añadida',
        { positionClass: 'toast-bottom-right' });
        this.taskForm.reset();
      }).catch(err => {
        this.toast.error(`ha ocurrido un error de tipo ${err} al guardar su tarea`, 
        'error al guardar la tarea', { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('los datos del formulario no son validos','Error al añadir la tarea'
      , { positionClass: 'toast-bottom-right'} )
      console.log(this.taskForm)
    }
  }

  info(){
    this._serviceAssign.get().subscribe((res: any) => {
      const e: any = [];
      this.competitor = [];
      res.forEach((element: any) => {
        e.push({
          id: element.payload.doc.data()['id'],
          name: element.payload.doc.data()['name'],
          idProyect: element.payload.doc.data()['idProyect']
        });
      });
      for(const competitor of e){
        if(competitor.idProyect == this.id) this.competitor.push(competitor)
      }
      if(this.competitor.length > 0) this.competitors = true;
      else this.competitors = false;
    })
  }

}
