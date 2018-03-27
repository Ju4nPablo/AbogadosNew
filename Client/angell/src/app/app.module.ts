import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { DashboardComponent } from './AdministratorComponents/dashboard/dashboard.component';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './AdministratorComponents/login/login.component';
import { InicioComponent } from './AdministratorComponents/inicio/inicio.component';
import { DashboardclienteComponent } from './ClientComponents/dashboardcliente/dashboardcliente.component';
import { InicioClienteComponent } from './ClientComponents/inicio-cliente/inicio-cliente.component';
//noinspection TypeScriptValidateTypes
//noinspection TypeScriptValidateTypes
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    InicioComponent,
    DashboardclienteComponent,
    InicioClienteComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
