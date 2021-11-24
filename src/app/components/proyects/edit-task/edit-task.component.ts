import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignService } from 'src/app/service/assign.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  task: any[] = [];
  id: any;
  competitor: any[] = [];
  competitors: boolean = false;

  constructor(private _service: TaskService, private formB: FormBuilder,
    private toast: ToastrService, private route: ActivatedRoute,
    private router: Router, private _serviceAssign: AssignService) {
      this.taskForm = this.formB.group({
        title: new FormControl("", Validators.compose([
          Validators.required
        ])),
        description: new FormControl("", Validators.compose([
          Validators.required
        ])),
        requirements: new FormControl("", Validators.compose([
          Validators.required
        ])),
        image: new FormControl(""),
        dueDate: new FormControl("", Validators.compose([
          Validators.required
        ])),
        responsable: new FormControl("", Validators.compose([
          Validators.required
        ]))
      })
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTask();
  }

  getTask(){
    this._service.getOne(this.id).subscribe((res: any) => {
      this.taskForm.setValue({
        title: res.payload.data()['title'],
        description: res.payload.data()['description'],
        requirements: res.payload.data()['requirements'],
        image: '',
        dueDate: res.payload.data()['dueDate'],
        responsable: ''
      });
      this.info(res.payload.data()['idProyect']);
    })
  }

  editTask(values: any){
    if(this.taskForm.valid){
      const task = {
        title: values.title,
        description: values.description,
        requirements: values.requirements,
        image: values.image,
        dueDate: values.dueDate,
        responsable: values.responsable,
      }
      this._service.update(this.id ,task).then(() => {
        this.toast.success('su tarea acaba de ser actualizada exitosamente', 'Tarea actualizada',
        { positionClass: 'toast-bottom-right' });
        this.taskForm.reset();
        this.router.navigate(['assign-proyect']);
        this.id = ''
      }).catch(err => {
        this.toast.error(`ha ocurrido un error de tipo ${err} al guardar su tarea`, 
        'error al guardar la tarea', { positionClass: 'toast-bottom-right' });
      })
    }else {
      this.toast.warning('los datos del formulario no son validos','Error al añadir la tarea'
      , { positionClass: 'toast-bottom-right'} )
      console.log(this.taskForm)   
    }
  }

  info(id: string){
    this._serviceAssign.get().subscribe((res: any) => {
      const e: any = [];
      this.competitor = [];
      res.forEach((element: any) => {
        e.push({
          id: element.payload.doc.id,
          name: element.payload.doc.data()['name'],
          idProyect: element.payload.doc.data()['idProyect']
        });
      });
      for(const competitor of e){
        if(competitor.idProyect == id) this.competitor.push(competitor)
      }
      if(this.competitor.length > 0){
        this.taskForm.controls['responsable'].enable();
        this.competitors = true;
      }
      else this.competitors = false;
    })
  }

}
