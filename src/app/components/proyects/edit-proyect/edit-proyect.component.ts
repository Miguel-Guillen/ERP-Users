import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProyectService } from 'src/app/service/proyect.service';
import { Proyect } from '../../../models/proyect'

@Component({
  selector: 'app-edit-proyect',
  templateUrl: './edit-proyect.component.html',
  styleUrls: ['./edit-proyect.component.css']
})
export class EditProyectComponent implements OnInit {
  editForm: FormGroup;
  proyect = new Proyect;
  id: any = '';

  constructor(private formB: FormBuilder, private toast: ToastrService,
    private _service: ProyectService, private route: ActivatedRoute,
    private router: Router) {
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.searchProyect(this.id);
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
    })
  }

  editProyect(values: any){
    if(this.editForm.valid){
      this.proyect = values;
      this.proyect.createdDate = new Date
      this._service.update(this.id, this.proyect).then(() => {
        this.toast.success('El proyecto ha sido modificado con exito', 'Proyecto modificafo', 
        { positionClass: 'toast-bottom-right' });
        this.editForm.reset();
        this.router.navigate(['proyect']);
      }).catch(err => {
        console.log(err);
      })
    }else {
      this.toast.warning('Los datos no son validos o los campos estan vacios'
      , 'Datos invalidos', { positionClass: 'toast-bottom-right' });
    }
  }

}
