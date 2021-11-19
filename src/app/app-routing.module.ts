import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employee/employees/employees.component'
import { ProyectComponent } from './components/proyects/proyect/proyect.component'
import { AssignProyectComponent } from './components/proyects/assign-proyect/assign-proyect.component'
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component'

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent },
  { path: 'proyect', component: ProyectComponent },
  { path: 'assign-proyect', component: AssignProyectComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
