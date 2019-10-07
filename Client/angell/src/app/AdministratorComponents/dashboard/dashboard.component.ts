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
import { LogCambiosService } from '../../Services/log-Cambios/log-cambios.service';
import { UserService } from '../../Services/user/user.service';
import { SendEmailService } from '../../Services/send-email/send-email.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
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
  showMenu: any = {};
  usuario: any = '';
  casoNotificacion: any = '';
  showDialog: Boolean = false;
  password: String = '';
  repitaPassword: String = '';
  blockCambio: Boolean = false;
  mostrarDashboard: Boolean = true;

  constructor(
    private casoService: CasoService,
    private router: Router,
    private _servicioBotones: BotonesService,
    private _serviceLogCambios: LogCambiosService,
    private _serviceUser: UserService,
    private _serviceMail: SendEmailService,
    private notifyService: NotificacionesService,
  ) {
    this.blockCambio = false;
    if (JSON.parse(localStorage.getItem('userLogin')).cambio_password) {
      this.showDialog = true;
      this.mostrarDashboard = false;
    }
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
      for (const caso of this.listCasos) {
        this.casoNotificacion = caso;
        this.AgregarNotificación(caso);
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
      id: (node._id === undefined) ? this.casoNotificacion._id : node._id,
      titulo: (node._id === undefined) ? this.casoNotificacion.label + '-' + node.label : 'Caso # ' + node.label,
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
    if (dias < 6 && (node.data.estado.id === '1' || node.data.estado.id === '2' || node.data.estado.id === '4')
      && (node.data.abogado.cedula === this.usuario.cedula || this.usuario.tipo === '1')) { //
      this.notifications.push(noti);
      // return;
    }
    if (dias > 5 && dias < 15 && (node.data.estado.id === '1' || node.data.estado.id === '2' || node.data.estado.id === '4')
      && (node.data.abogado.cedula === this.usuario.cedula || this.usuario.tipo === '1')) {
      noti.color = 'amarillo';
      this.notifications.push(noti);
      // return;
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

  cambiarClave() {
    this.blockCambio = true;
    if (!this.campoVacio(this.password) && this.password === this.repitaPassword) {
      let userCambioPassword = JSON.parse(localStorage.getItem('userLogin'));
      userCambioPassword.password = this.password;
      userCambioPassword.cambio_password = false;
      this._serviceUser.updateUser(userCambioPassword).subscribe(data => {
        let us = {
          respuestaBDD: data,
          data: userCambioPassword
        };
        const log = {
          usuario: userCambioPassword.user_name,
          cedula: userCambioPassword.cedula,
          fecha: new Date(),
          transaccion: 'CAMBIO-CLAVE',
          cambio_json: {
            mensaje: 'CAMBIO existoso!',
            data: us
          }
        };
        this.showDialog = false;
        this.mostrarDashboard = true;
        this._serviceLogCambios.addLogCambio(log).subscribe();
        const mail = {
          destinatario: userCambioPassword.mail,
          asunto: 'CAMBIO contraseña',
          texto: 'Cambio Password', //this.datosMail.body,
          html: '<p>Estimado: ' + userCambioPassword.nombres + ',</p><p>Su clave a sido cambiada de forma exitosa </p><p>Nota: Si usted no realizo la solicitud comunicarse a los numeros que se encuentran acontinuación.</p>'
        };
        this._serviceMail.sendNotifications(mail).subscribe(data => {
          if (data) {
            let mailLog = {
              respuestaBDD: data,
              data: mail
            };
            const log = {
              usuario: userCambioPassword.user_name,
              cedula: userCambioPassword.cedula,
              fecha: new Date(),
              transaccion: 'ENVIO-MAIL-CAMBIO-CLAVE',
              cambio_json: {
                mensaje: 'Cambio de clave exitoso!',
                data: mailLog
              }
            };
            this._serviceLogCambios.addLogMail(log).subscribe();
            this.notifyService.notify('success', 'Exito', 'Cambio de clave exitoso!');
          } else {
            let mailLog = {
              respuestaBDD: data,
              data: mail
            }
            const log = {
              usuario: userCambioPassword.user_name,
              cedula: userCambioPassword.cedula,
              fecha: new Date(),
              transaccion: 'ERROR-ENVIO-MAIL-CAMBIO-CLAVE',
              cambio_json: {
                mensaje: 'Error en el envío de mail con confirmando cambio clave!',
                data: mailLog
              }
            }
            this._serviceLogCambios.addLogMail(log).subscribe();
            // this.notifyService.notify('error', 'ERROR', 'Error en el envío de su clave temporal a su correo!');
            this.blockCambio = false;
          }
        });
      }, error => {
        let us = {
          respuestaBDD: error,
          data: userCambioPassword
        };
        const log = {
          usuario: userCambioPassword.user_name,
          cedula: userCambioPassword.cedula,
          fecha: new Date(),
          transaccion: 'ERROR-CAMBIO-CLAVE',
          cambio_json: {
            mensaje: 'No se pudo realizar el CAMBIO DE CONTRASEÑA!',
            data: us
          }
        }
        this.logout();
        this.router.navigateByUrl('/dashboard/login');
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('error', 'ERROR', 'No se pudo realizar el CAMBIO DE CONTRASEÑA!');
      });
    } else {
      this.blockCambio = false;
      this.notifyService.notify('error', 'ERROR', 'REVISE LOS CAMPOS/CONTRASEÑAS INVÁLIDAS!');
    }
  }

  // valida campos nulos vacios undefined
  campoVacio(campo) {
    if (campo === undefined || campo === '' || campo === null) {
      return true;
    } else {
      return false;
    }
  }

  cancelar() {
    this.router.navigateByUrl('/dashboard/login');
  }

}
