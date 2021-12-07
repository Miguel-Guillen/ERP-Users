import { Component, OnInit } from '@angular/core';
import { AssignService } from 'src/app/service/assign.service';
import { ProyectService } from 'src/app/service/proyect.service';

@Component({
  selector: 'app-my-proyects',
  templateUrl: './my-proyects.component.html',
  styleUrls: ['./my-proyects.component.css']
})
export class MyProyectsComponent implements OnInit {
  search: any;
  proyects: any[] = [];
  proyectsDone: any[] = [];
  myInfo: any[] = [];
  show = false;
  format = 'dd/MM/yyyy';
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _service: ProyectService, private _serviceCompetitor: AssignService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.info();
    this.getProyects();
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

  getProyects(){
    this._service.get().subscribe((res: any) => {
      this.proyects = [];
      const proyects: any = [];
      res.forEach((element: any) => {
        proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      for(const p of proyects){
        if(p.id == this.myInfo[0].idProyect && p.estatus == 'Activo') this.proyects.push(p)
        if(p.id == this.myInfo[0].idProyect && p.estatus == 'Finalizado') this.proyectsDone.push(p)
      }
    })
  }

}
