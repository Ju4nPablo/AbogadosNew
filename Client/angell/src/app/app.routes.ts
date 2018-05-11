/**
 * Created by xaipo on 3/27/2018.
 */
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {DashboardComponent} from "./AdministratorComponents/dashboard/dashboard.component";
import {LoginComponent} from "./AdministratorComponents/login/login.component"
import {InicioComponent} from "./AdministratorComponents/inicio/inicio.component"
import {DashboardclienteComponent} from "./ClientComponents/dashboardcliente/dashboardcliente.component";
import {InicioClienteComponent} from "./ClientComponents/inicio-cliente/inicio-cliente.component";
import {ClienteComponent} from "./AdministratorComponents/cliente/cliente.component";
import {AbogadoComponent} from "./AdministratorComponents/abogado/abogado.component";
import {ActividadesComponent} from "./AdministratorComponents/actividades/actividades.component";
import { ActividadParametrizableComponent } from './AdministratorComponents/actividad-parametrizable/actividad-parametrizable.component';
const appRoutes:Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent
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
      }, {
        path: 'actividadesParametro',
        component: ActividadParametrizableComponent
      },
      {
        path: 'inicio',
        component: InicioComponent
      },
      {
        path: '',
        component: InicioComponent
      },
      {
        path: '**',
        component: InicioComponent
      },

    ]
  },
  {path: 'dashboardcliente', component: DashboardclienteComponent,
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
  },
  {path: 'login', component: LoginComponent},

  {path: '', component: LoginComponent},
  {path: '**', component: LoginComponent},
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
