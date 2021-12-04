import { Component, OnInit } from '@angular/core';
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
  show = false;
  format = 'dd/MM/yyyy';
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _service: ProyectService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getProyects();
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
        if(p.estatus == 'Finalizado') this.proyectsDone.push(p);
        if(p.estatus == 'Activo') this.proyects.push(p);
      }
    })
  }

}
