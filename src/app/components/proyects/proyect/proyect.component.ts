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
  search: any;
  user = {
    id: '',
    email: '',
    rol: ''
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
      area: new FormControl("", Validators.compose([
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
      res.forEach((element: any) => {
        this.proyects.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  searchProyect(id: string){
    this.route.navigate([`editProyect/${id}`]);
  }

  newProyect(values: any){
    if(this.proyectForm.valid){
      this.proyect = values;
      this.proyect.createdDate = new Date;
      this._service.add(this.proyect).then(() => {
        this.toast.success('El proyecto ha sido añadido con exito', 'Proyecto añadido', 
        { positionClass: 'toast-bottom-right' })        
        this.proyectForm.reset();
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el empleado', 
        { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      , 'Datos invalidos', { positionClass: 'toast-bottom-right' });
    }
  }

  deleteProyect(id: string){
    this._service.delete(id).then(() => {
      this.toast.info('El proyecto ha sido borrado con exito', 'Proyecto borrado', 
      { positionClass: 'toast-bottom-right' })    
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al borrar el proyecto', 
      { positionClass: 'toast-bottom-right' });
    })
  }

}
