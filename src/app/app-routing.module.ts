import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employee/employees/employees.component'
import { ProyectComponent } from './components/proyects/proyect/proyect.component'

const routes: Routes = [
  { path: 'employee', component: EmployeesComponent },
  { path: 'proyect', component: ProyectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
