import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/service/task.service';
import { UserAuth } from 'src/app/core/models/auth';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  listTasks: Task[] = [];
  doneTasks: any[] = [];
  search: any;

  user = new UserAuth();
  show = false;

  format = 'dd/MM/yyyy';

  constructor(private _service: TaskService, private route: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('data') || '{}');
    this.getTasks();
  }

  getTasks(){
    this._service.getMyTasks(this.user.id).subscribe((res: any) => {
      const data: Task[] = res.cont.task;
      this.listTasks = [];
      this.doneTasks = [];

      for(const task of data){
        if(task.blnActivo === true && task.estatus !== 'Terminado' ){
          this.listTasks.push(task);
        }else {
          this.doneTasks.push(task);
        }
      }

    })
  }

  searchTask(id: string){
    this.route.navigate([`sendTask/${id}`]);
  }

}
