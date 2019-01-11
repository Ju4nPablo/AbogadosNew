/**
 * Created by xaipo on 3/27/2018.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './AdministratorComponents/dashboard/dashboard.component';
import { LoginComponent } from './AdministratorComponents/login/login.component';
import { InicioComponent } from './AdministratorComponents/inicio/inicio.component';
import { DashboardclienteComponent } from './ClientComponents/dashboardcliente/dashboardcliente.component';
import { InicioClienteComponent } from './ClientComponents/inicio-cliente/inicio-cliente.component';
import { ClienteComponent } from './AdministratorComponents/cliente/cliente.component';
import { AbogadoComponent } from './AdministratorComponents/abogado/abogado.component';
import { ActividadExtraComponent } from './AdministratorComponents/actividad-extra/actividad-extra.component';
import { FlujoProcesoComponent } from './AdministratorComponents/flujo-proceso/flujo-proceso.component';
import { BajaFlujoProcesoComponent } from './AdministratorComponents/baja-flujo-proceso/baja-flujo-proceso.component';
import { CasoComponent } from './AdministratorComponents/caso/caso.component';
import { ReporteComponent } from './AdministratorComponents/reporte/reporte.component';
import { UserComponent } from './AdministratorComponents/user/user.component';
import { DashboardabogadoComponent } from './AbogadoComponents/dashboardabogado/dashboardabogado.component';
import { CasoAbogadoComponent } from './AbogadoComponents/caso-abogado/caso-abogado.component';
import { InicioAbogadoComponent } from './AbogadoComponents/inicio-abogado/inicio-abogado.component';

const appRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
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
        path: 'actividadExtra',
        component: ActividadExtraComponent
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

    ]
  },
  {
    path: 'dashboardcliente', component: DashboardclienteComponent,
    children: [
      {
        path: 'inicioCliente',
        component: InicioClienteComponent
      },
      {
        path: '',
        component: InicioClienteComponent
      },
      {
        path: '**',
        component: InicioClienteComponent
      },

    ]
  }
  ,
  {
    path: 'dashboardabogado', component: DashboardabogadoComponent,
    children: [
      {
        path: 'inicioAbogado',
        component: InicioAbogadoComponent
      },
      {
        path: 'casoAbogado',
        component: CasoAbogadoComponent
      },
      {
        path: '**',
        component: InicioClienteComponent
      },

    ]
  },
  { path: 'login', component: LoginComponent },

  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
