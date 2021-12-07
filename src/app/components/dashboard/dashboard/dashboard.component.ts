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
  id = '';
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
    if(this.user.rol == 'administrador'){
      this.proyectsActive();
    }else {
      this.myProyects();
      this.myTasks();
    }
  }

  myProyects(){
    this._serviceProyect.get().subscribe((res: any) => {
      const proyects: any = []
      this.proyects = [];
      res.forEach((element: any) => {
        proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const p of proyects){
        if(p.estatus == 'Activo' && p.id == this.myInfo[0].idProyect){
          this.proyects.push(p)
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

  proyect(){
    this.route.navigate([`/myProyects`]);
  }

  // section administrator

  proyectsActive(){
    this._serviceProyect.projectsActive().subscribe((res: any) => {
      this.actives = [];
      res.forEach((element: any) => {
        this.actives.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  getTask(id: string){
    this.tasks = [];
    this.taskToDo = [];
    this.taskInProgress = [];
    this.taskReview = [];
    this.taskDone = [];
    this._serviceTask.getActive(id).subscribe((res: any) => {
      for(const element of res){
        this.tasks.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      }
      if(this.tasks.length == 0) this.data = false;

      for(let i = 0; i < this.tasks.length; i++){
        for(let j = 0; j < this.responsables.length; j++){
          if(this.tasks[i].responsable === this.responsables[j].idEmployee){
            this.tasks[i].name = this.responsables[j].name;
          }
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

  viewTask(){
    this.route.navigate(['/assign-proyect'])
  }

  // extras

  getResponsables(id: string){
    this._serviceCompetitor.getCompetitors(id).subscribe((res: any) => {
      this.responsables = [];
      for(const element of res){
        this.responsables.push({
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          idEmployee: element.payload.doc.data()['idEmployee']
        });
      };
    })
  }

  getData(id: string){
    this.getResponsables(id);
    this.getTask(id);
  }

}
