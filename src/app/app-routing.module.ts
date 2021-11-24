import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employee/employees/employees.component'
import { ProyectComponent } from './components/proyects/proyect/proyect.component'
import { AssignProyectComponent } from './components/proyects/assign-proyect/assign-proyect.component'
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component'
import { TasksComponent } from './components/proyects/tasks/tasks.component'
import { EditTaskComponent } from './components/proyects/edit-task/edit-task.component'
import { MyTasksComponent } from './components/dashboard/my-tasks/my-tasks.component'

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent },
  { path: 'proyect', component: ProyectComponent },
  { path: 'assign-proyect', component: AssignProyectComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task/:id', component: TasksComponent },
  { path: 'editTask/:id', component: EditTaskComponent },
  { path: 'myTasks', component: MyTasksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
