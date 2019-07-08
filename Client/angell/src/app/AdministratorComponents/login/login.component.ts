import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
import { LoginService } from '../../Services/login.service';
import { LogCambiosService } from '../../Services/log-Cambios/log-cambios.service';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

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

  constructor(
    // private _route: ActivatedRouter,
    private router: Router,
    private _serviceLogin: LoginService,
    private _servicioLogCambios: LogCambiosService,
    private messageService: MessageService
  ) {
    // this.title='Login'
    this.user = new User('', '', 1, '', '');
  }

  ngOnInit() {
  }

  public login() {
    try {
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
        if (<any>error.status !== 401) {
          if (<any>error.status !== 404) {
            if (<any>error.status === 502) {
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
        }
      });
    } catch (exception) {
      console.log(exception.message);
    }
  }
}
