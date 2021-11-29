import { Component, OnInit } from '@angular/core';
import { ProyectService } from 'src/app/service/proyect.service';

@Component({
  selector: 'app-my-proyects',
  templateUrl: './my-proyects.component.html',
  styleUrls: ['./my-proyects.component.css']
})
export class MyProyectsComponent implements OnInit {
  user = {
    id: '',
    email: '',
    rol: ''
  }

  constructor(private _serviceProyect: ProyectService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

}
