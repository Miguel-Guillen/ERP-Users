import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employee/employees/employees.component'
import { ProyectComponent } from './components/proyects/proyect/proyect.component'
import { AssignProyectComponent } from './components/proyects/assign-proyect/assign-proyect.component'
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component'
import { TasksComponent } from './components/proyects/tasks/tasks.component'
import { EditTaskComponent } from './components/proyects/edit-task/edit-task.component'
import { MyTasksComponent } from './components/dashboard/my-tasks/my-tasks.component'
import { SendTaskComponent } from './components/dashboard/send-task/send-task.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { EditProyectComponent } from './components/proyects/edit-proyect/edit-proyect.component';

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent },
  { path: 'editEmployee/:id', component: EditEmployeeComponent },
  { path: 'proyect', component: ProyectComponent },
  { path: 'editProyect/:id', component: EditProyectComponent },
  { path: 'assign-proyect', component: AssignProyectComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task/:id', component: TasksComponent },
  { path: 'editTask/:id', component: EditTaskComponent },
  { path: 'myTasks', component: MyTasksComponent },
  { path: 'sendTask/:id', component: SendTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
