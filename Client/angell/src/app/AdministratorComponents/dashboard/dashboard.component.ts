import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CasoService } from '../../Services/caso/caso.service';
import { Router } from '@angular/router';
import { CasoComponent } from '../caso/caso.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { and } from '@angular/router/src/utils/collection';
import { BotonesService } from '../../Services/botones/botones.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notification: any = [];
  casoComponente: CasoComponent;
  status: boolean;
  nombreUser: any = '';
  listCasos: any = [];
  notifications: any;
  cantidad_notificaciones: number;
  msgs: any = [];
  showMenu = {};
  usuario: any = '';
  casoNotificacion: any = '';

  constructor(
    private casoService: CasoService,
    private router: Router,
    private _servicioBotones: BotonesService,
  ) {
    this.listCasos = [];
    this.notifications = [];
    this.casoNotificacion = '';
    this.status = false;
    this.usuario = JSON.parse(localStorage.getItem('userLogin'));
    const nombres = this.usuario.nombres.split(' ');
    const apellidos = this.usuario.apellidos.split(' ');
    this.nombreUser = nombres[0] + ' ' + apellidos[0];
    if (this.nombreUser.length > 13) {
      this.nombreUser = nombres[0];
    }
    if (this.usuario.tipo === '1') {
      this.showMenu = _servicioBotones.showMenuAdministrador;
    }
    if (this.usuario.tipo === '2') {
      this.showMenu = _servicioBotones.showMenuCliente;
    }
    if (this.usuario.tipo === '3') {
      this.showMenu = _servicioBotones.showMenuAbogado;
    }
  }

  ngOnInit() {
    this.casoService.allCasoPendientes().subscribe(data => {
      this.listCasos = data;
      for (const c of this.listCasos) {
        this.casoNotificacion = c;
        this.AgregarNotificación(c);
      }
      this.cantidad_notificaciones = this.notifications.length;
    });

    /* this.notifications = [
      { titulo: 'tramite juzgado 1', estado: '1', color: 'rojo', redireccion: '' },
      { titulo: 'tramite juzgado 1', estado: '1', color: 'rojo', redireccion: '' },
      { titulo: 'tramite juzgado 1', estado: '1', color: 'rojo', redireccion: '' },
      { titulo: 'tramite juzgado 1', estado: '1', color: 'amarillo', redireccion: '' },
      { titulo: 'tramite juzgado 1', estado: '1', color: 'amarillo', redireccion: '' },
      { titulo: 'tramite juzgado 1', estado: '1', color: 'amarillo', redireccion: '' },
      { titulo: 'tramite juzgado 1', estado: '1', color: 'amarillo', redireccion: '' }
    ]; */

  }

  // Verificar caso recursivo.
  private AgregarNotificación(node: any) {
    const noti = {
      id: node._id,
      titulo: node.label,
      estado: '1',
      color: 'rojo',
      cliente: this.casoNotificacion.data.cliente,
      redireccion: '',
      caso: this.casoNotificacion
    };
    const fecha = new Date();
    const fechaNodoInicio = new Date(node.data.fecha_inicio);
    const fechaNodoFin = new Date(node.data.fecha_fin);
    const res = fechaNodoFin.getTime() - fecha.getTime();
    const dias = Math.round(res / (1000 * 60 * 60 * 24));
    if (dias < 6 && (node.data.estado.id === '1' || node.data.estado.id === '2' || node.data.estado.id === '4')) { //
      this.notifications.push(noti);
      return;
    }
    if (dias > 5 && dias < 15 && node.data.estado.id === '1') {
      noti.color = 'amarillo';
      this.notifications.push(noti);
      return;
    }
    if (node.children.length) {
      node.children.forEach(childNode => {
        this.AgregarNotificación(childNode);
      });
    }
  }

  cargarCaso(notificacion: any) {
    localStorage.setItem('caso', JSON.stringify(notificacion.caso));
    const pag = window.location;
    if (pag.hash === '#/dashboard/caso') {
      location.reload(true);
    } else {
      this.router.navigateByUrl('/dashboard/caso');
    }
  }

  logout() {
    localStorage.setItem('userLogin', JSON.stringify(''));
    localStorage.setItem('caso', JSON.stringify(''));
  }

}
