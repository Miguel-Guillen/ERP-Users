import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/home/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProyectComponent } from './components/proyects/proyect/proyect.component';
import { DetailsProyectComponent } from './components/proyects/details-proyect/details-proyect.component';
import { TasksComponent } from './components/proyects/tasks/tasks.component';
import { MyTasksComponent } from './components/dashboard/my-tasks/my-tasks.component';
import { SendTaskComponent } from './components/dashboard/send-task/send-task.component';
import { MyProyectsComponent } from './components/dashboard/my-proyects/my-proyects.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AcercadeComponent } from './components/dashboard/acercade/acercade.component';
import { AuthGuard } from './core/guards/auth.guard';

import { ProyectsPipe } from './core/pipes/proyects.pipe';
import { EmployeePipe } from './core/pipes/employee.pipe';
import { DetailsTaskComponent } from './components/dashboard/details-task/details-task.component';
import { TaskPipe } from './core/pipes/task.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ProyectComponent,
    DetailsProyectComponent,
    DashboardComponent,
    ProyectsPipe,
    TasksComponent,
    MyTasksComponent,
    SendTaskComponent,
    EmployeePipe,
    LoginComponent,
    MyProyectsComponent,
    SidebarComponent,
    FooterComponent,
    AcercadeComponent,
    DetailsTaskComponent,
    TaskPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
