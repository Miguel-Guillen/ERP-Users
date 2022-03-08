import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/core/service/task.service';
import { ProyectService } from 'src/app/core/service/proyect.service';
import { UserAuth } from 'src/app/core/models/auth';
import { Proyect } from 'src/app/core/models/proyect';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {
  listTasks: Task[] = [];
  user = new UserAuth();
  proyect = new Proyect();

  idTask = '';
  format = 'dd/MM/yyyy';

  constructor(private _service: TaskService, private _projectService: ProyectService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('data') || '{}');
    this.idTask = this.route.snapshot.paramMap.get('id') || '';
    this.getTask();
    this.getProject();
  }

  getTask(){
    this._service.getMyTasks(this.user.id).subscribe((res: any) => {
      const data = res.cont.task;
      this.listTasks = [];

      for(const task of data){
        if(task.blnActivo === true && task.idProject == this.idTask){
          this.listTasks.push(task);
        }
      }
    })
  }
  
  getProject(){
    this._projectService.getOne(this.idTask).subscribe((res: any) => {
      const data: Proyect = res.cont.project[0];
      if(data.blnActivo === true){
        this.proyect = data;
      }
    })
  }

}
