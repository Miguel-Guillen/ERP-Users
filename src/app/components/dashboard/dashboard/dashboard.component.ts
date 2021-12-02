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
  show = false;
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
    this._serviceProyect.getMyProjects().subscribe((res: any) => {
      const proyects: any = [];
      this.proyects = [];
      res.forEach((element: any) => {
        proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const p of proyects){
        for(const i of this.myInfo){
          if(p.id == i.idProyect) this.proyects.push(p)
        }
      }
    })
  }

  info(){
    this._serviceCompetitor.getById(this.user.id).subscribe((res: any) => {
      res.forEach((element: any) => {
        this.myInfo.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  myTasks(){
    this._serviceTask.getMyTasks().subscribe((res: any) => {
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
    const view = '1';
    this.route.navigate([`/sendTask/${id}`]);
    this._serviceTask.update(id, view).then(() => {});
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
