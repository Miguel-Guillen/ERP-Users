import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignService } from 'src/app/service/assign.service';
import { ProyectService } from 'src/app/service/proyect.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  proyects: any[] = [];
  myInfo: any[] = [];
  tasks: any[] = [];
  taskToDo: any[] = [];
  taskInProgress: any[] = [];
  taskReview: any[] = [];
  taskDone: any[] = [];
  isAdmin: boolean | undefined;
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _serviceProyect: ProyectService, private route: Router,
    private _serviceCompetitor: AssignService, private _serviceTask: TaskService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '')
    this.info();
    this.getProyects();
    this.myTasks();
    this.getTask();
  }

  getProyects(){
    this._serviceProyect.get().subscribe((res: any) => {
      const proyects: any = [];
      res.forEach((element: any) => {
        proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const p of proyects){
        if(p.id == this.myInfo[0].idProyect) this.proyects.push(p)
      }
    })
  }

  info(){
    this._serviceCompetitor.get().subscribe((res: any) => {
      const competitors: any = [];
      res.forEach((element: any) => {
        competitors.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const c of competitors){
        if(c.idEmployee == this.user.id) this.myInfo.push(c)
      }
    })
  }

  myTasks(){
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
        if(task.responsable == this.user.id && task.estatus != 'Terminado') this.tasks.push(task)
      }
    })
  }

  task(id: string){
    this.route.navigate([`/sendTask/${id}`]);
  }

  // section administrator

  getTask(){
    if(this.user.rol == 'administrador'){
      this._serviceTask.get().subscribe((res: any) => {
        const tasks: any = [];
        this.taskToDo = [];
        this.taskInProgress = [];
        this.taskReview = [];
        this.taskDone = [];
        res.forEach((element: any) => {
          tasks.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        for(const t of tasks){
          if(t.estatus == 'Por hacer' || t.estatus == 'Rehacer') this.taskToDo.push(t);
          if(t.estatus == 'En progreso') this.taskInProgress.push(t);
          if(t.estatus == 'Revision') this.taskReview.push(t);
          if(t.estatus == 'Terminado') this.taskDone.push(t);
        }
      })
    }
  }

  viewTask(){
    this.route.navigate(['/assign-proyect'])
  }

}
