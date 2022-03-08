import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProyectComponent } from './components/proyects/proyect/proyect.component';
import { DashboardComponent } from './components/dashboard/home/dashboard.component';
import { TasksComponent } from './components/proyects/tasks/tasks.component'
import { MyTasksComponent } from './components/dashboard/my-tasks/my-tasks.component'
import { SendTaskComponent } from './components/dashboard/send-task/send-task.component';
import { DetailsProyectComponent } from './components/proyects/details-proyect/details-proyect.component';
import { LoginComponent } from './components/login/login.component';
import { AcercadeComponent } from './components/dashboard/acercade/acercade.component';
import { MyProyectsComponent } from './components/dashboard/my-proyects/my-proyects.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DetailsTaskComponent } from './components/dashboard/details-task/details-task.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProyectComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: DetailsProyectComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'myTask', component: MyTasksComponent, canActivate: [AuthGuard] },
  { path: 'myProject', component: MyProyectsComponent, canActivate: [AuthGuard] },
  { path: 'details-task/:id', component: DetailsTaskComponent, canActivate: [AuthGuard] },
  { path: 'sendTask/:id', component: SendTaskComponent, canActivate: [AuthGuard] },
  { path: 'acercade', component: AcercadeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
