import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasks: any[] = [];
  doneTasks: any[] = [];
  selected: boolean = false;
  show = false;
  id = 'PEu4uT3QCwsAMDPUVHZZ';
  area = 'Programacion de aplicaciones';

  constructor(private _serviceTask: TaskService, private route: Router) { }

  ngOnInit(): void {
    this.myTasks();
  }

  myTasks(){
    this._serviceTask.get().subscribe((res: any) => {
      const t: any = [];
      this.tasks = [];
      this.doneTasks = [];
      res.forEach((element: any) => {
        t.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const task of t){
        if(task.responsable == this.id && task.estatus != 'Terminado') this.tasks.push(task)
        if(task.responsable == this.id && task.estatus == 'Terminado') this.doneTasks.push(task)
      }
    })
  }

  infoTask(id: string){
    this.route.navigate([`sendTask/${id}`]);
  }
}
