import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProyectService } from 'src/app/core/service/proyect.service';
import { Proyect } from '../../../core/models/proyect';
import * as types from '../../../core/enums/proyect.enum';
import { UserAuth } from 'src/app/core/models/auth';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {
  proyectForm: FormGroup;
  proyectsProgress: Proyect[] = [];
  proyectsDone: Proyect[] = [];
  proyectsDesactivated: Proyect[] = [];
  search: any;
  
  user = new UserAuth();
  formValid = true;
  send = false;
  
  show = 0;
  closeResult = '';
  format = 'dd/MM/yyyy';

  typeEstatus = types.TypeEstatus;

  validation_messages = {
    name: [
      { type: 'required', message: 'Nombre requerido' }
    ],
    description: [
      { type: 'required', message: 'Descripcion requerida' }
    ],
    dateStart: [
      { type: 'required', message: 'Fecha de inicio requerida' }
    ],
    dateEnd: [
      { type: 'required', message: 'Fecha de entrega requerida' }
    ]
  }

  constructor(private formB: FormBuilder, private _service: ProyectService,
    private modal: NgbModal, private toast: ToastrService, private route: Router) {
    this.proyectForm = this.formB.group({
      name: new FormControl("", Validators.compose([
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
    this.user = JSON.parse(localStorage.getItem('data') || '{}');
    this.getProyects();
  }

  getProyects(){
    this._service.get().subscribe((res: any) => {
      const data = res.cont.project;
      this.proyectsProgress = [];
      this.proyectsDone = [];
      this.proyectsDesactivated = [];

      for(const proyect of data){
        if(proyect.blnActivo === true){
          if(proyect.estatus == types.TypeEstatus.En_progreso || proyect.estatus == types.TypeEstatus.Pausado) 
          this.proyectsProgress.push(proyect);
          if(proyect.estatus == types.TypeEstatus.Cerrado) this.proyectsDone.push(proyect);
        }else {
          this.proyectsDesactivated.push(proyect);
        }
      }
    })
  }

  searchProyect(id: string){
    this.route.navigate([`/details/${id}`]);
  }

  newProyect(values: Proyect){
    if(this.proyectForm.valid){
      this.send = true;
      let proyect = values;
      proyect.estatus = this.typeEstatus.En_progreso;

      this._service.add(proyect).then(() => {
        this.toast.success('El proyecto ha sido añadido con exito', '', 
        { positionClass: 'toast-bottom-right' });
        this.modal.dismissAll('Save click');
        this.getProyects();
        this.reset();
      }).catch(err => {
        this.toast.error(`Ha ocurrido un error al agregar el empleado`, '', 
        { positionClass: 'toast-bottom-right' });
        console.log(err);
        this.send = false;
        this.formValid = true;
      })

    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios', '',
      { positionClass: 'toast-bottom-right' });
      this.formValid = false;
    }
  }

  openModal(content: any){
    this.modal.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get name(){
    return this.proyectForm.get('name');
  }

  get description(){
    return this.proyectForm.get('description');
  }
  
  get dateStart(){
    return this.proyectForm.get('dateStart');
  }

  get dateEnd(){
    return this.proyectForm.get('dateEnd');
  }

  reset(){
    this.proyectForm.reset();
    this.send = false;
    this.formValid = true;
  }

}
