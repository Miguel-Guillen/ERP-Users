import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProyectService } from 'src/app/service/proyect.service';
import { AssignService } from 'src/app/service/assign.service';
import { Proyect } from '../../../models/proyect'

@Component({
  selector: 'app-edit-proyect',
  templateUrl: './edit-proyect.component.html',
  styleUrls: ['./edit-proyect.component.css']
})
export class EditProyectComponent implements OnInit {
  editForm: FormGroup;
  myProyect: any[] = [];
  competitors: any[] = [];
  proyect = new Proyect;
  id: any = '';
  formValid: boolean = true;
  send: boolean = false;
  user = {
    id: '',
    email: '',
    rol: ''
  }
  format = 'dd/MM/yyyy'

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
    area: [
      { type: 'required', message: 'Area del proyecto requerida' }
    ],
    estatus: [
      { type: 'required', message: 'Estado del proyecto requerido' }
    ],
    dateStart: [
      { type: 'required', message: 'Fecha de inicio requerida' }
    ],
    dateEnd: [
      { type: 'required', message: 'Fecha de entrega requerida' }
    ]
  }

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private _service: ProyectService, private route: ActivatedRoute,
    private router: Router, private _serviceCompetitor: AssignService) {
    this.editForm = this.formB.group({
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
      estatus: new FormControl("", Validators.compose([
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.searchProyect(this.id);
    this.getCompetitor();
  }

  searchProyect(id: string){
    this._service.getOne(id).subscribe((res: any) => {
      this.myProyect.push({
        id: res.payload.id,
        ...res.payload.data()
      })
      this.editForm.setValue({
        name: res.payload.data()['name'],
        area: res.payload.data()['area'],
        type: res.payload.data()['type'],
        estatus: res.payload.data()['estatus'],
        description: res.payload.data()['description'],
        dateStart: res.payload.data()['dateStart'],
        dateEnd: res.payload.data()['dateEnd']
      })
    })
  }

  editProyect(values: any){
    if(this.editForm.valid){
      this.send = true;
      this.proyect = values;
      this.proyect.createdDate = new Date
      this._service.update(this.id, this.proyect).then(() => {
        this.toast.success('El proyecto ha sido modificado con exito', 'Proyecto modificafo', 
        { positionClass: 'toast-bottom-right' });
        this.send = false;
        this.formValid = true;
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al añadir el proyecto', 
        { positionClass: 'toast-bottom-right' });
        this.send = false;
        this.formValid = true;
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      ,'Datos invalidos', { positionClass: 'toast-bottom-right' });
      this.formValid = false;
    }
  }

  deleteProyect(){
    this._service.delete(this.id).then(() => {
      this.toast.info('El proyecto ha sido borrado con exito', 'Proyecto borrado', 
      { positionClass: 'toast-bottom-right' })
      this.router.navigate(['/proyect'])
    }).catch(err => {
      this.toast.error(`Ha ocurrido un error de tipo ${err}`, 'Error al borrar el proyecto', 
      { positionClass: 'toast-bottom-right' });
    })
  }

  getCompetitor(){
    this._serviceCompetitor.get().subscribe((res: any) => {
      this.competitors = [];
      res.forEach((element: any) => {
        const e = element.payload.doc.data()['idProyect'];
        if(e == this.id){
          this.competitors.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        }
      });
    })
  }

  reset(){
    this.editForm.reset();
  }

}
