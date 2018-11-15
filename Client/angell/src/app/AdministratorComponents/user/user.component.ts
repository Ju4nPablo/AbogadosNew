import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user/user.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //#region VARIABLES CREADAS
  user = {
    user_name: '',
    password: '',
    cedula: '',
    mail: '',
    estado: '0',
    tipo: ''
  };
  selectUser = {
    user_name: '',
    password: '',
    cedula: '',
    mail: '',
    estado: '0',
    tipo: ''
  };
  bandera = {
    ban1: '0',
    ban2: '0',
    ban3: '0',
    ban4: '0'
  };
  fileImagen: File = null;
  listaUser: any = [];
  listTipoUser: any = [];
  selectTipo: any = '';
  selectEstado: any = '0';
  cols: any = [];
  showDialog: boolean;
  showDialogMod: boolean;
  urlImagen: any = 'assets/perfil.png';
  uploadedFiles: any;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public userService: UserService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService
  ) {
    this.cols = [];
    this.cols = [
      { field: 'user_name', header: 'Nombre Usuario' },
      { field: 'cedula', header: 'Cédula' },
      { field: 'mail', header: 'Email' },
      { field: 'tipo', header: 'Tipo Usuario' },
      { field: 'estado', header: 'Estado' },
    ];
    this.inicio();
  }
  //#endregion

  //#region INICIALIZAR VARIABLES
  inicio() {
    this.user = {
      user_name: '',
      password: '',
      cedula: '',
      mail: '',
      estado: '0',
      tipo: ''
    };
    this.selectUser = {
      user_name: '',
      password: '',
      cedula: '',
      mail: '',
      estado: '0',
      tipo: ''
    };
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0'
    };
    this.listaUser = [];
    this.listTipoUser = [];
    this.showDialog = false;
    this.showDialogMod = false;
    this.selectEstado = true;
    this.selectTipo = true;

    this.userService.listUser().subscribe(data => {
      const d: any = data;
      for (const us of d) {
        if (us.tipo === '1') {
          us.tipo = 'Administrador';
        }
        if (us.tipo === '2') {
          us.tipo = 'Cliente';
        }
        if (us.tipo === '3') {
          us.tipo = 'Abogado';
        }
        if (us.estado === '1') {
          us.estado = 'Activo';
        } else {
          us.estado = 'Inactivo';
        }
        this.listaUser.push(us);
      }
    }, err => {
      console.log(err);
    });
    this.listTipoUser = [
      {
        id: '1',
        tipo: 'Administrador'
      },
      {
        id: '2',
        tipo: 'Cliente'
      }
    ];
    this.selectTipo = this.listTipoUser[0];
  }

  ngOnInit() {

  }
  //#endregion

  //#region INGRESO Y MADIFICAR User
  // Añadir un User
  addUser() {
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1') {
      if (this.selectEstado === true) {
        this.user.estado = '1';
      } else {
        this.user.estado = '0';
      }
      this.user.tipo = this.selectTipo.id;
      this.userService.addUser(this.user).subscribe(data => {
        this.showDialog = false;
        this.notifyService.notify('success', 'Exito', 'Ingreso Existoso!');
        this.inicio();
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'User ya existe!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Revise Campos!');
    }
  }
  // Modificar un User
  updateUser() {
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1') {
      if (this.selectEstado === true) {
        this.selectUser.estado = '1';
      } else {
        this.selectUser.estado = '0';
      }
      this.selectUser.tipo = this.selectTipo.id;
      this.userService.updateUser(this.selectUser).subscribe(data => {
        this.showDialogMod = false;
        this.inicio();
        this.notifyService.notify('success', 'Exito', 'Modificación Existosa!');
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'User ya Existe!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Revise Campos!');
    }
  }
  //#endregion

  //#region CARGAR Y MOSTRAR FORMULARIOS
  // Cerrar formulario
  cancelar() {
    this.selectUser = {
      user_name: '',
      password: '',
      cedula: '',
      mail: '',
      estado: '0',
      tipo: ''
    };
    this.user = {
      user_name: '',
      password: '',
      cedula: '',
      mail: '',
      estado: '0',
      tipo: ''
    };
    this.showDialog = false;
    this.showDialogMod = false;
    this.inicio();
  }
  // Mostrar formulario de ingreso.
  showDialogAdd() {
    document.getElementById('nombre').style.borderColor = '';
    document.getElementById('password').style.borderColor = '';
    document.getElementById('cedula').style.borderColor = '';
    document.getElementById('mail').style.borderColor = '';
    this.user = {
      user_name: '',
      password: '',
      cedula: '',
      mail: '',
      estado: '0',
      tipo: ''
    };
    this.selectUser = {
      user_name: '',
      password: '',
      cedula: '',
      mail: '',
      estado: '',
      tipo: ''
    };
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0'
    };
    this.selectEstado = true;
    this.selectTipo = this.listTipoUser[0];
    this.showDialog = true;
  }
  // cargar datos de la seleccion de una fila de la tabla y mostrar el formulario de modificar
  onRowSelect(event) {
    document.getElementById('nombreMod').style.borderColor = '';
    document.getElementById('passwordMod').style.borderColor = '';
    document.getElementById('cedulaMod').style.borderColor = '';
    document.getElementById('mailMod').style.borderColor = '';
    this.bandera = {
      ban1: '1',
      ban2: '1',
      ban3: '1',
      ban4: '1'
    };
    this.selectUser = event.data;
    this.selectUser.password = '';
    if (event.data.estado === 'Activo') {
      this.selectEstado = true;
    } else {
      this.selectEstado = false;
    }
    this.listTipoUser.forEach(obj => {
      if (obj.tipo === event.data.tipo) {
        this.selectTipo = obj;
      }
    });
    this.showDialogMod = true;
  }
  //#endregion

  //#region VALICADION DE CAMPOS
  // Verifca la cedula
  verificaCedula() {
    if (this.user.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.user.cedula)) {
        document.getElementById('cedula').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedula').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
      }
    }
    if (this.selectUser.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.selectUser.cedula)) {
        document.getElementById('cedulaMod').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedulaMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
      }
    }
  }
  // verifica Password
  verificaPassword() {
    if (this.user.password !== '') {
      if (this.user.password.length < 6) {
        document.getElementById('password').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('password').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
      }
    } else {
      document.getElementById('password').style.borderColor = '';
      this.bandera.ban2 = '1';
    }
    if (this.selectUser.password !== '') {
      if (this.selectUser.password.length < 6) {
        document.getElementById('passwordMod').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('passwordMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
      }
    } else {
      document.getElementById('passwordMod').style.borderColor = '';
      this.bandera.ban2 = '1';
    }
  }
  // verifica email
  verificaEmail() {
    if (this.user.mail !== '') {
      if (!this.validarService.validateEmail(this.user.mail)) {
        document.getElementById('mail').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mail').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
      }
    }
    if (this.selectUser.mail !== '') {
      if (!this.validarService.validateEmail(this.selectUser.mail)) {
        document.getElementById('mailMod').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mailMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
      }
    }
  }
  // verifica nombre usuario
  verificaNameUser() {
    if (this.user.user_name !== '') {
      if (this.user.user_name.length < 6) {
        document.getElementById('nombre').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombre').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
      }
    }
    if (this.selectUser.user_name !== '') {
      if (this.selectUser.user_name.length < 6) {
        document.getElementById('nombreMod').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombreMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
      }
    }
  }
}