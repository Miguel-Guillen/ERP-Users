import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectService } from 'src/app/service/proyect.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasks: any[] = [];
  doneTasks: any[] = [];
  proyects: any[] = [];
  selected: boolean = false;
  show = false;
  format = 'dd/MM/yyyy';
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _serviceTask: TaskService, private route: Router,
    private _serviceProyect: ProyectService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.myTasks();
    this.getProyects();
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
        if(task.responsable == this.user.id && task.estatus != 'Terminado') this.tasks.push(task)
        if(task.responsable == this.user.id && task.estatus == 'Terminado') this.doneTasks.push(task)
      }
    })
  }

  infoTask(id: string){
    this.route.navigate([`sendTask/${id}`]);
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
      for(let j = 0; j < this.tasks.length; j++){
        for(let i = 0; i < this.proyects.length; i++){
            if(this.tasks[j].idProyect == this.proyects[i].id) 
            this.tasks[j].name = this.proyects[i].name;
        }
      }
      for(let j = 0; j < this.doneTasks.length; j++){
        for(let i = 0; i < this.proyects.length; i++){
            if(this.doneTasks[j].idProyect == this.proyects[i].id) 
            this.doneTasks[j].name = this.proyects[i].name;
        }
      }
    })
  }
}
