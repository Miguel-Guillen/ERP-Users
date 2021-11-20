import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProyectService } from 'src/app/service/proyect.service';
import { AssignProyectService } from 'src/app/services/assign-proyect.service';

@Component({
  selector: 'app-assign-proyect',
  templateUrl: './assign-proyect.component.html',
  styleUrls: ['./assign-proyect.component.css']
})
export class AssignProyectComponent implements OnInit {
  proyects: any[] = [];
  proyect: any[] = [];
  search: any;
  newTask = false;

  constructor(private _service: AssignProyectService, private formB: FormBuilder,
    private _serviceProyect: ProyectService) { }

  ngOnInit(): void {
    this._serviceProyect.get().subscribe((res: any) => {
      this.proyects = [];
      res.forEach((element: any) => {
        this.proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  tasks(id: string){
    this._serviceProyect.getOne(id).subscribe((res: any) => {
        this.proyect.push({
          id: id,
          ...res.payload.data()
        });
    })
    this.newTask = true;
  }
}
