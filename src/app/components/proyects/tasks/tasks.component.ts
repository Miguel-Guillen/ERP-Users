import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/service/task.service';
import { Task } from 'src/app/core/models/task';
import * as types from '../../../core/enums/task.enum'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  listTasks: Task[] = [];
  search: any;
  filterPriority: string = 'Todo';
  filterEstatus: string = 'Todo';

  format = 'dd/MM/yyyy';

  typePriority = types.priority;
  typeEstatus = types.estatus;

  // user = {
  //   id: '',
  //   email: '',
  //   rol: ''
  // }

  constructor(private _service: TaskService, private route: Router) {
    this.typePriority.unshift('Todo');
    this.typeEstatus.unshift('Todo');
  };

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getTasks();
  }

  searchTask(id: string){
    this.route.navigate([`/details/${id}`]);
  }

  getTasks(){
    this._service.get().subscribe((res: any) => {
      const data = res.cont.task;
      this.listTasks = [];

      for(const task of data){
        if(task.blnActivo === true){
          this.listTasks.push(task);
        }
      }

    })
  }

}
