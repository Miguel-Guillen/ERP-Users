import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProyectService } from 'src/app/service/proyect.service';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {
  proyectForm: FormGroup;
  editForm: FormGroup;
  proyects: any[] = [];
  id = '';

  constructor(private formB: FormBuilder, private _service: ProyectService) {
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
      dateStart: new FormControl("", Validators.compose([
        Validators.required
      ])),
      dateEnd: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit(): void {
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
    this._service.getOne(id).subscribe((res: any) => {
      this.editForm.setValue({
        name: res.payload.data()['name'],
        area: res.payload.data()['area'],
        type: res.payload.data()['type'],
        description: res.payload.data()['description'],
        dateStart: '',
        dateEnd: ''
      })
      this.id = id;
    })
  }

  newProyect(values: any){
    if(this.proyectForm.valid){
      const proyect = {
        name: values.name,
        type: values.type,
        description: values.description,
        area: values.area,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        createdDate: new Date()
      };
      this._service.add(proyect).then(() => {
        alert("proyecto guardado exitosamente");
        this.proyectForm.reset();
      }).catch(err => {
        console.log(err);
      })
    }else {
      console.log("formulario invalido")
    }
  }

  editProyect(values: any){
    if(this.editForm.valid){
      const proyecto = {
        name: values.name,
        type: values.type,
        description: values.description,
        area: values.area,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd
      }
      this._service.update(this.id ,proyecto).then(() => {
        alert("proyecto actualizado exitosamente");
        this.editForm.reset();
        this.id = ''
      }).catch(err => {
        console.log(err);
      })
    }else {
      console.log("formulario invalido");
    }
  }

  deleteProyect(id: string){
    this._service.delete(id).then(() => {
      alert("registro eliminado");
    }).catch(err => {
      console.log("ha ocurrido un error al eliminar", err);
    })
    this.editForm.reset();
  }

}
