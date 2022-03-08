import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/service/task.service';
import { UserAuth } from 'src/app/core/models/auth';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  user = new UserAuth();
  
  format = 'dd/MM/yyyy'

  constructor(private _service: TaskService, private route: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('data') || '{}')
    this.getTask();
  }

  navigate(route: string){
    this.route.navigate([`/${route}`]);
  }

  getTask(){
    this._service.getMyTasks(this.user.id).subscribe((res: any) => {
      const data: Task[] = res.cont.task;
      
      for(const task of data){
        if(task.blnActivo == true && task.estatus != 'Terminado'){
          this.tasks.push(task);
        }
      }
    })
  }

  searchTask(id: string){
    this.route.navigate([`/sendTask/${id}`]);
  }

}
