import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignService } from 'src/app/service/assign.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { ProyectService } from 'src/app/service/proyect.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  proyects: any[] = [];
  actives: any[] = [];
  myInfo: any[] = [];
  myTask: any[] = [];
  tasks: any[] = [];
  taskToDo: any[] = [];
  taskInProgress: any[] = [];
  taskReview: any[] = [];
  taskDone: any[] = [];
  responsables: any [] = [];
  data: boolean | undefined;
  show = false;
  format = 'dd/MM/yyyy'
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
    this.proyectsActive();
  }

  getProyects(){
    this._serviceProyect.getMyProjects().subscribe((res: any) => {
      this.proyects = [];
      res.forEach((element: any) => {
        this.proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
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
    this._serviceTask.getMyTasks(this.user.id).subscribe((res: any) => {
      this.myTask = [];
      res.forEach((element: any) => {
        this.myTask.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  task(id: string){
    this.route.navigate([`/sendTask/${id}`]);
  }

  // section administrator

  proyectsActive(){
    this._serviceProyect.get().subscribe((res: any) => {
      this.actives = [];
      const proyects: any = []
      res.forEach((element: any) => {
        proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const p of proyects){
        if(p.estatus == 'Activo') this.actives.push(p)
      }
    })
  }

  getTask(id: string){
    if(this.user.rol == 'administrador'){
      this.taskToDo = [];
      this.taskInProgress = [];
      this.taskReview = [];
      this.taskDone = [];
      this.tasks = [];
      this.getResponsables(id);
      this._serviceTask.getActive(id).subscribe((res: any) => {
        res.forEach((element: any) => {
          this.tasks.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        if(this.tasks.length == 0) this.data = false;
        for(let i = 0; i < this.tasks.length; i++){
          for(let j = 0; j < this.responsables.length; j++){
            if(this.tasks[i].responsable == this.responsables[j].idEmployee) 
            this.tasks[i].name = this.responsables[j].name;
          }
        }
        for(const t of this.tasks){
          if(t.estatus == 'Por hacer' || t.estatus == 'Rehacer') this.taskToDo.push(t);
          if(t.estatus == 'En progreso') this.taskInProgress.push(t);
          if(t.estatus == 'Revision') this.taskReview.push(t);
          if(t.estatus == 'Terminado') this.taskDone.push(t);
        }
      })
      this.data = true;
    }
  }

  viewTask(){
    this.route.navigate(['/assign-proyect'])
  }

  // extras

  getResponsables(id: string){
    this._serviceCompetitor.getCompetitors(id).subscribe((res: any) => {
      this.responsables = [];
      res.forEach((element: any) => {
        this.responsables.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

}
