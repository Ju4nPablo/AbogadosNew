/**
 * Created by xaipo on 3/27/2018.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './AdministratorComponents/dashboard/dashboard.component';
import { LoginComponent } from './AdministratorComponents/login/login.component';
import { InicioComponent } from './AdministratorComponents/inicio/inicio.component';
import { ClienteComponent } from './AdministratorComponents/cliente/cliente.component';
import { AbogadoComponent } from './AdministratorComponents/abogado/abogado.component';
import { ActividadExtraComponent } from './AdministratorComponents/actividad-extra/actividad-extra.component';
import { FlujoProcesoComponent } from './AdministratorComponents/flujo-proceso/flujo-proceso.component';
import { BajaFlujoProcesoComponent } from './AdministratorComponents/baja-flujo-proceso/baja-flujo-proceso.component';
import { CasoComponent } from './AdministratorComponents/caso/caso.component';
import { ReporteComponent } from './AdministratorComponents/reporte/reporte.component';
import { UserComponent } from './AdministratorComponents/user/user.component';
import { GraficosComponent } from './AdministratorComponents/graficos/graficos.component';

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
      {
        path: 'graficas',
        component: GraficosComponent
      },

    ]
  },
  { path: 'login', component: LoginComponent },

  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
