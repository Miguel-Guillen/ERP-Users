import { Component, OnInit } from '@angular/core';
import { ProyectService } from 'src/app/core/service/proyect.service';
import { UserAuth } from 'src/app/core/models/auth';
import { Proyect } from 'src/app/core/models/proyect';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-proyects',
  templateUrl: './my-proyects.component.html',
  styleUrls: ['./my-proyects.component.css']
})
export class MyProyectsComponent implements OnInit {
  listProjects: Proyect[] = [];
  search: any;
  
  user = new UserAuth();
  
  format = 'dd/MM/yyyy';

  constructor(private _service: ProyectService, private route: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('data') || '{}');
    this.getProyects();
  }

  getProyects(){
    this._service.getMyProjects(this.user.id).subscribe((res: any) => {
      const proyects = res.cont.project;
      const listProjects = [];
      this.listProjects = [];

      for(const proyect of proyects){
        if(proyect.blnActivo === true && proyect.responsable == this.user.id){
          listProjects.push(proyect.projects[0]);
        }
      }

      this.listProjects.push(listProjects[0]);

      for(const myProjects of listProjects){
        for(const project of this.listProjects){
          if(project._id !== myProjects._id){
            this.listProjects.push(myProjects);
          }
        }
      }

    })
  }

  searchTask(id: string){
    this.route.navigate([`/details-task/${id}`]);
  }

}
