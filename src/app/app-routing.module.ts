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
import { LoginComponent } from './components/login/login.component';
import { AcercadeComponent } from './components/dashboard/acercade/acercade.component';
import { MyProyectsComponent } from './components/dashboard/my-proyects/my-proyects.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'editEmployee/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'proyect', component: ProyectComponent, canActivate: [AuthGuard] },
  { path: 'editProyect/:id', component: EditProyectComponent, canActivate: [AuthGuard] },
  { path: 'assign-proyect', component: AssignProyectComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'editTask/:id', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'myTasks', component: MyTasksComponent, canActivate: [AuthGuard] },
  { path: 'sendTask/:id', component: SendTaskComponent, canActivate: [AuthGuard] },
  { path: 'myProyects', component: MyProyectsComponent, canActivate: [AuthGuard] },
  { path: 'acercade', component: AcercadeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
