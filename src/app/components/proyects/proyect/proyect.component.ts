import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProyectService } from 'src/app/service/proyect.service';
import { Proyect } from '../../../models/proyect'

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {
  proyectForm: FormGroup;
  proyect = new Proyect;
  proyects: any[] = [];
  proyectsDone: any[] = [];
  search: any;
  show = false;
  formValid: boolean = true;
  send: boolean = false;
  user = {
    id: '',
    email: '',
    rol: ''
  }
  format = 'dd/MM/yyyy';

  validation_messages = {
    name: [
      { type: 'required', message: 'Nombre requerido' }
    ],
    description: [
      { type: 'required', message: 'Descripcion requerida' }
    ],
    type: [
      { type: 'required', message: 'Tipo de proyecto requerido' }
    ],
    dateStart: [
      { type: 'required', message: 'Fecha de inicio requerida' }
    ],
    dateEnd: [
      { type: 'required', message: 'Fecha de entrega requerida' }
    ]
  }

  constructor(private formB: FormBuilder, private _service: ProyectService,
    private route: Router, private toast: ToastrService) {
    this.proyectForm = this.formB.group({
      name: new FormControl("", Validators.compose([
        Validators.required
      ])),
      type: new FormControl("", Validators.compose([
        Validators.required
      ])),
      description: new FormControl("", Validators.compose([
        Validators.required
      ])),
      dateStart: new FormControl("", Validators.compose([
        Validators.required
      ])),
      dateEnd: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

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
        if(p.estatus == 'Finalizado' || p.estatus == 'Cancelado') this.proyectsDone.push(p);
        else this.proyects.push(p);
      }
    })
  }

  searchProyect(id: string){
    this.route.navigate([`editProyect/${id}`]);
  }

  newProyect(values: any){
    if(this.proyectForm.valid){
      this.send = true;
      this.proyect = values;
      this.proyect.estatus = 'Activo';
      this.proyect.createdDate = new Date;
      this._service.add(this.proyect).then(() => {
        this.toast.success('El proyecto ha sido añadido con exito', 'Proyecto añadido', 
        { positionClass: 'toast-bottom-right' })        
        this.proyectForm.reset();
        this.send = false;
        this.formValid = true;
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
        { positionClass: 'toast-bottom-right' });
        this.send = false;
        this.formValid = true;
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      , 'Datos invalidos', { positionClass: 'toast-bottom-right' });
      this.formValid = false;
    }
  }

  reset(){
    this.proyectForm.reset();
  }

}
