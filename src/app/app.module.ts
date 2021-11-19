import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { ProyectComponent } from './components/proyects/proyect/proyect.component';
import { EditProyectComponent } from './components/proyects/edit-proyect/edit-proyect.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { EditDashboardComponent } from './components/dashboard/edit-dashboard/edit-dashboard.component';
import { AssignProyectComponent } from './components/proyects/assign-proyect/assign-proyect.component';
import { ProyectsPipe } from './pipes/proyects.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EditEmployeeComponent,
    ProyectComponent,
    EditProyectComponent,
    DashboardComponent,
    EditDashboardComponent,
    AssignProyectComponent,
    ProyectsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
