import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
import { LoginService } from '../../Services/login.service';
import { LogCambiosService } from '../../Services/log-Cambios/log-cambios.service';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { UserService } from '../../Services/user/user.service';
import { SendEmailService } from '../../Services/send-email/send-email.service';

// import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  msgs: Message[] = [];
  public user: User;
  showLogin: boolean = true;
  showDialog: boolean = false;
  userPasswd: any = {
    user_name: '',
    mail: '',
    password: '',
    cambio_password: true,
  };
  blockCampo: any = {
    userName: false,
    mail: true,
    buscar: false,
    recuperar: false,
    cancelar: false
  };
  showCampo: any = {
    userName: true,
    mail: false,
    buscar: true,
    recuperar: false
  };
  mail: string = '';
  list: any;

  constructor(
    // private _route: ActivatedRouter,
    private router: Router,
    private _serviceLogin: LoginService,
    private _servicioLogCambios: LogCambiosService,
    private messageService: MessageService,
    public notifyService: NotificacionesService,
    public _serviceUser: UserService,
    public _serviceMail: SendEmailService,
    public _serviceLogCambios: LogCambiosService,
  ) {
    // this.title='Login'
    this.user = new User('', '', 1, '', '');
    this.list = [];
  }

  ngOnInit() {
    // this.showLogin = true;
    this.showDialog = false;
    this.mail = '';
    this.userPasswd = {
      user_name: '',
      mail: '',
      password: '',
      cambio_password: true,
    }
    this.blockCampo = {
      userName: false,
      mail: true,
      buscar: false,
      recuperar: false,
      cancelar: false
    }
    this.showCampo = {
      userName: true,
      mail: false,
      buscar: true,
      recuperar: false
    }
  }

  public login() {
    try {
      if (!this.campoVacio(this.user.user_name) && !this.campoVacio(this.user.password)) {
        this._serviceLogin.login(this.user).subscribe(response => {
          if (response.user._id) {
            localStorage.setItem('userLogin', JSON.stringify(response.user));
            // this.messageService.add({ severity: 'success', summary: 'Ingreso Correcto', detail: 'Bienvenido' });
            const log = {
              usuario: response.user.user_name,
              cedula: response.user.cedula,
              fecha: new Date(),
              transaccion: 'LOGIN-CORRECTO',
              cambio_json: {
                mensaje: 'Ingreso correcto!',
                data: response
              }
            }
            this._servicioLogCambios.addLogCambio(log).subscribe(data => {
            });
            if (response.user.tipo === '1') {
              this.router.navigateByUrl('/dashboard/actividadExtra');
            } else {
              this.router.navigateByUrl('/dashboard/caso');
            }
            /* if (response.user.tipo === '2') {
              this.router.navigateByUrl('/dashboardcliente');
            }
            if (response.user.tipo === '3') {
              this.router.navigateByUrl('/dashboardabogado');
            } */
          } else {
            this.messageService.add({
              severity: 'error', summary: 'Usuario o contraseña ',
              detail: 'Verifique su usuario o contraseña'
            });
          }
        }, error => {
          if (error.status !== 401) {
            if (error.status !== 404) {
              if (error.status === 502) {
                console.log('error servidor');
              }
            } else {
              this.messageService.add({
                severity: 'error', summary: 'ERROR AL INGRESAR',
                detail: 'Usuario o contraseña INCORRECTOS'
              });
              const log = {
                usuario: this.user.user_name,
                cedula: '',
                fecha: new Date(),
                transaccion: 'ERROR-LOGIN',
                cambio_json: {
                  mensaje: 'Usuario o contraseña INCORRECTOS',
                  data: error
                }
              }
              this._servicioLogCambios.addLogCambio(log).subscribe(data => {
              });
            }
          } else {
            this.messageService.add({
              severity: 'error', summary: 'EXISTEN CAMPOS VACIOS',
              detail: 'Verifique su usuario o contraseña'
            });
          };
          if (error.status === 0) {
            this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
          }
        });
      } else {
        this.messageService.add({
          severity: 'error', summary: 'EXISTEN CAMPOS VACIOS',
          detail: 'Verifique su usuario o contraseña'
        });
      }
    } catch (exception) {
      console.log(exception.message);
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

  // recuperar clave de usuario.
  recuperarClave() {
    this.blockCampo.cancelar = true;
    this.blockCampo.recuperar = true;
    this.userPasswd.password = this.generar(6);
    this.userPasswd.cambio_password = true;
    this._serviceUser.updateUser(this.userPasswd).subscribe(data => {
      let us = {
        respuestaBDD: data,
        data: this.userPasswd
      };
      const log = {
        usuario: this.userPasswd.user_name,
        cedula: this.userPasswd.cedula,
        fecha: new Date(),
        transaccion: 'RECUPERAR-CLAVE',
        cambio_json: {
          mensaje: 'RECUPERAR existoso!',
          data: us
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      const mail = {
        destinatario: this.userPasswd.mail,
        asunto: 'Recuperar contraseña',
        texto: 'Password', //this.datosMail.body,
        html: '<p>Estimado: ' + this.userPasswd.nombres + ',</p><p>Su clave para el ingreso al sistema es: <strong>' + this.userPasswd.password +
          '</strong></p><p>Nota: Si usted no realizo la solicitud comunicarse a los numeros que se encuentran acontinuación.</p>'
      };
      this._serviceMail.sendNotifications(mail).subscribe(data => {
        if (data) {
          this.cancelar();
          let mailLog = {
            respuestaBDD: data,
            data: mail
          };
          const log = {
            usuario: this.userPasswd.user_name,
            cedula: this.userPasswd.cedula,
            fecha: new Date(),
            transaccion: 'ENVIO-MAIL-RECUPERAR-CLAVE',
            cambio_json: {
              mensaje: 'Clave temporal enviada a su correo!',
              data: mailLog
            }
          };
          this._serviceLogCambios.addLogMail(log).subscribe();
          this.notifyService.notify('success', 'Exito', 'Clave temporal enviada a su correo!');
        } else {
          let mailLog = {
            respuestaBDD: data,
            data: mail
          }
          const log = {
            usuario: this.userPasswd.user_name,
            cedula: this.userPasswd.cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ENVIO-MAIL-RECUPERAR-CLAVE',
            cambio_json: {
              mensaje: 'Error en el envío de su clave temporal a su correo!',
              data: mailLog
            }
          }
          this._serviceLogCambios.addLogMail(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'Error en el envío de su clave temporal a su correo!');
          this.blockCampo.recuperar = false;
          this.blockCampo.cancelar = false;
        }
      });
    }, error => {
      let us = {
        respuestaBDD: error,
        data: this.userPasswd
      };
      const log = {
        usuario: this.userPasswd.user_name,
        cedula: this.userPasswd.cedula,
        fecha: new Date(),
        transaccion: 'ERROR-RECUPERAR-CLAVE',
        cambio_json: {
          mensaje: 'RECUPERAR fallido!',
          data: us
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      this.notifyService.notify('error', 'ERROR', 'No se pudo completar su solicitud!');
    });

  }

  // cerrar dialogo recuperar contrasena
  mostrarDialogoRecuperarPassword() {
    // this.showLogin = false;
    this.showDialog = true;
  };

  // Buscar usuario
  buscarUser() {
    this._serviceUser.getUserName(this.userPasswd.user_name).subscribe(data => {
      this.list = data;
      if (this.list.length > 0) {
        this.userPasswd = data[0];
        this.mail = data[0].mail;
        this.blockCampo.userName = true;
        this.showCampo.mail = true;
        this.showCampo.buscar = false;
        this.showCampo.recuperar = true;
      } else {
        this.blockCampo.userName = false;
        this.showCampo.mail = false;
        this.showCampo.buscar = true;
        this.showCampo.recuperar = false;
        this.notifyService.notify('error', 'ERROR', 'Usuario no encontrado!');
      }

    }, error => {
      if (error.status === 0)
        this.notifyService.notify('error', 'ERROR', 'Error de conexión!');
    });
  }
  // cerrar dialogo recuperar contrasena
  cancelar() {
    this.showDialog = false;
    this.ngOnInit();
  }

  generar(longitud) {
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (let i = 0; i < longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return contraseña;
  }
}
