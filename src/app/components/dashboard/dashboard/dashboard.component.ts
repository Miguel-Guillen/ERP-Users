import { Component, OnInit } from '@angular/core';
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
  isAdmin: boolean | undefined;
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _serviceProyect: ProyectService, 
    private _serviceCompetitor: AssignService, private _serviceTask: TaskService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '')
    this.info();
    this.getProyects();
    this.myTasks();
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
        if(c.id == this.user.id) this.myInfo.push(c)
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
}
