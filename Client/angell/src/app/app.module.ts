import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { DashboardComponent } from './AdministratorComponents/dashboard/dashboard.component';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './AdministratorComponents/login/login.component';
import { InicioComponent } from './AdministratorComponents/inicio/inicio.component';
import { DashboardclienteComponent } from './ClientComponents/dashboardcliente/dashboardcliente.component';
import { InicioClienteComponent } from './ClientComponents/inicio-cliente/inicio-cliente.component';
import { HttpModule } from '@angular/http';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/components/common/messageservice';
import {GrowlModule} from 'primeng/growl'
import {ScheduleModule} from 'primeng/schedule';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputText';
//import {CheckModule} from 'primeng/check';
import {CalendarModule} from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';




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
    BrowserAnimationsModule,
    ButtonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    ScheduleModule,
    DialogModule,
    InputTextModule,
    CalendarModule,

  //  CheckboxModule,
    ButtonModule,
    TabViewModule

],
  providers: [
    appRoutingProviders,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }