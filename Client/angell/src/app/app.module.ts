import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './AdministratorComponents/dashboard/dashboard.component';
import { routing, appRoutingProviders } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './AdministratorComponents/login/login.component';
import { InicioComponent } from './AdministratorComponents/inicio/inicio.component';
import { HttpModule } from '@angular/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { ScheduleModule } from 'primeng/schedule';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputText';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
/* import {CheckModule} from 'primeng/check'; */
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
/* For tables */
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ClienteComponent } from './AdministratorComponents/cliente/cliente.component';
import { AbogadoComponent } from './AdministratorComponents/abogado/abogado.component';
import { PanelModule } from 'primeng/panel';
import { ClienteService } from './Services/cliente/cliente.service';
import { AbogadoService } from './Services/abogado/abogado.service';
import { ActividadExtraService } from './Services/actividad-extra/actividad-extra.service';
import { ValidacioneService } from './Services/validaciones/validacione.service';
import { EventService } from './Services/event/event.service';
import { NotificacionesService } from './Services/notificaciones/notificaciones.service';
import { NotificationComponent } from './AdministratorComponents/notification/notification.component';
import { ActividadExtraComponent } from './AdministratorComponents/actividad-extra/actividad-extra.component';
import { TreeModule } from 'primeng/tree';
import { FlujoProcesoComponent } from './AdministratorComponents/flujo-proceso/flujo-proceso.component';
import { FlujoProcesoService } from './Services/flujo-proceso/flujo-proceso.service';
import { BajaFlujoProcesoComponent } from './AdministratorComponents/baja-flujo-proceso/baja-flujo-proceso.component';
import { CasoService } from './Services/caso/caso.service';
import { CasoComponent } from './AdministratorComponents/caso/caso.component';
import { ReporteComponent } from './AdministratorComponents/reporte/reporte.component';
import { UserComponent } from './AdministratorComponents/user/user.component';
import { LoginService } from './Services/login/login.service';
import { UserService } from './Services/user/user.service';
import { SendEmailService } from './Services/send-email/send-email.service';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerModule } from 'primeng/spinner';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { LogCambiosService } from './Services/log-Cambios/log-cambios.service';
import { ListaCombosService } from './Services/listas-Combos/lista-combos.service';
import { EditorModule } from 'primeng/editor';
import { BotonesService } from './Services/botones/botones.service';
import { EtiquetasService } from './Services/etiquetas/etiquetas.service';
import { PermisosUserService } from './Services/permisos-user/permisos-user.service';
import { GraficosComponent } from './AdministratorComponents/graficos/graficos.component';

//#region  antes
/*Navigation*/
/* const appRoutes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'usuario',
    component: UserComponent
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'abogado',
    component: AbogadoComponent
  },
  {
    path: 'actividades',
    component: ActividadesComponent
  },
  {
    path: 'actividadExtra',
    component: ActividadExtraComponent
  },
  {
    path: 'actividadesParametro',
    component: ActividadParametrizableComponent
  },
  {
    path: 'flujoProceso',
    component: FlujoProcesoComponent
  },
  {
    path: 'bajaFlujoProceso',
    component: BajaFlujoProcesoComponent
  },
  {
    path: 'caso',
    component: CasoComponent
  },
  {
    path: 'reporte',
    component: ReporteComponent
  },
  { path: 'login', component: LoginComponent }
];
 */
//#endregion
//noinspection TypeScriptValidateTypes
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    InicioComponent,
    ClienteComponent,
    AbogadoComponent,
    NotificationComponent,
    ActividadExtraComponent,
    FlujoProcesoComponent,
    BajaFlujoProcesoComponent,
    CasoComponent,
    ReporteComponent,
    UserComponent,
    GraficosComponent,

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
    PanelModule,
    /*  CheckboxModule, */
    ButtonModule,
    TabViewModule,
    Ng2SmartTableModule,
    TableModule,
    InputSwitchModule,
    FileUploadModule,
    ListboxModule,
    MultiSelectModule,
    DropdownModule,
    TreeModule,
    TooltipModule,
    SpinnerModule,
    GalleriaModule,
    InputMaskModule,
    CheckboxModule,
    EditorModule,
    ChartModule,
    ProgressSpinnerModule,
  ],
  providers: [
    appRoutingProviders,
    MessageService,
    ClienteService,
    AbogadoService,
    ValidacioneService,
    NotificacionesService,
    ActividadExtraService,
    EventService,
    FlujoProcesoService,
    CasoService,
    LoginService,
    UserService,
    SendEmailService,
    LogCambiosService,
    ListaCombosService,
    BotonesService,
    EtiquetasService,
    PermisosUserService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
