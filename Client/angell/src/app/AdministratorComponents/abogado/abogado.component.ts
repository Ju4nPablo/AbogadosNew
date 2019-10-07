import { Component, OnInit } from '@angular/core';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { LogCambiosService } from '../../Services/log-Cambios/log-cambios.service';
import { Router } from '@angular/router';
import { BotonesService } from '../../Services/botones/botones.service';

@Component({
  selector: 'app-abogado',
  templateUrl: './abogado.component.html',
  styleUrls: ['./abogado.component.css']
})
export class AbogadoComponent implements OnInit {

  //#region VARIABLES CREADAS
  abogado = {
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    mail: '',
    sexo: '0',
    estado: '0',
    foto: ''
  };
  selectAbogado = {
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    mail: '',
    sexo: '0',
    estado: '0',
    foto: ''
  };
  bandera = {
    ban1: '0',
    ban2: '0',
    ban3: '0',
    ban4: '0',
    ban5: '0'
  };
  logAbogado: any = {};
  fileImagen: File = null;
  listaAbogado: any[];
  selectSexo: any = '';
  selectEstado: any = '0';
  cols: any[];
  showDialog: boolean;
  showDialogMod: boolean;
  urlImagen: any = 'assets/perfil.png';
  uploadedFiles: any;
  totalRecords: number;
  blockBotones: any = {};
  paginado: number = 10;

  loading: boolean;

  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public abogadoService: AbogadoService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService,
    private _serviceLogCambios: LogCambiosService,
    private router: Router,
    private _serviceBotones: BotonesService,
  ) {
    this.inicio();
  }
  //#endregion

  //#region INICIO DE VARIABLES
  inicio() {
    this.paginado = 10;
    this.blockBotones = this._serviceBotones.blockBotonesGene;
    const user = JSON.parse(localStorage.getItem('userLogin'));
    if (user.tipo !== '1') {
      this.router.navigateByUrl('/dashboard/caso');
    }
    this.totalRecords = 0;
    // this.cols = [];
    this.abogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.selectAbogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0',
      ban5: '0'
    };

    this.listaAbogado = [];
    this.showDialog = false;
    this.showDialogMod = false;
    this.selectEstado = true;
    this.selectSexo = true;
    this.urlImagen = 'assets/perfil.png';

    this.abogadoService.listAbogado().subscribe(data => {
      this.loading = true;
      const aux: any = data;
      if (aux.length > 0) {
        this.totalRecords = aux.length;
        setTimeout(() => {
          let cont = 0;
          for (const abo of aux) {
            if (abo.sexo === '0') {
              abo.sexo = 'Hombre';
            } else {
              abo.sexo = 'Mujer';
            }
            if (abo.estado === '0') {
              abo.estado = 'Activo';
            } else {
              abo.estado = 'Inactivo';
            }
            this.listaAbogado.push(abo);
            cont++;
            if (cont === this.totalRecords) {
              this.loading = false;
            };
          }
        }, 2000);
      } else {
        this.notifyService.notify('error', 'ERROR', 'NO EXISTEN REGISTROS!');
        this.loading = false;
      };
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'cedula', header: 'Cédula', width: '13%' },
      { field: 'nombre', header: 'Nombres', width: '13%' },
      { field: 'direccion', header: 'Dirección', width: '13%' },
      { field: 'telefono', header: 'Teléfono', width: '13%' },
      { field: 'mail', header: 'Email', width: '22%' },
      { field: 'sexo', header: 'Sexo', width: '13%' },
      { field: 'estado', header: 'Estado', width: '13%' },
    ];
  }
  //#endregion

  //#region INGRESO Y MODIFICACION
  // Añadir un abogado
  addAbogado() {
    this.blockBotones = this._serviceBotones.disabledBotonesGene;
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1' &&
      this.bandera.ban5 === '1') {
      this.abogado.foto = this.urlImagen;
      if (this.selectSexo === true) {
        this.abogado.sexo = '0';
      } else {
        this.abogado.sexo = '1';
      }
      this.abogadoService.addAbogado(this.abogado).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        this.showDialog = false;
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'ADD-ABOGADO',
          cambio_json: {
            mensaje: 'Ingreso existoso!',
            data: data
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.inicio();
        this.notifyService.notify('success', 'Exito', 'Ingreso existoso!');
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        let abogadoLog = {
          respuestaBDD: err,
          data: this.abogado
        };
        if (err.status !== 0) {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ADD-ABOGADO',
            cambio_json: {
              mensaje: 'Abogado ya existe!',
              data: abogadoLog
            }
          };
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'Abogado ya existe!');
        } else {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ADD-ABOGADO',
            cambio_json: {
              mensaje: 'ERROR DE CONEXIÓN!',
              data: abogadoLog
            }
          }
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
        };
      });
    } else {
      this.blockBotones = this._serviceBotones.blockBotonesGene;
      this.notifyService.notify('error', 'ERROR', 'Revise Campos!');
    }
  }
  // Modificar un abogado
  updateAbogado() {
    this.blockBotones = this._serviceBotones.disabledBotonesGene;
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1' &&
      this.bandera.ban5 === '1') {
      this.selectAbogado.foto = this.urlImagen;
      if (this.selectSexo === true) {
        this.selectAbogado.sexo = '0';
      } else {
        this.selectAbogado.sexo = '1';
      }
      if (this.selectEstado === true) {
        this.selectAbogado.estado = '0';
      } else {
        this.selectAbogado.estado = '1';
      }
      this.abogadoService.updateAbogado(this.selectAbogado).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        this.showDialogMod = false;
        let abogadoLog = {
          respuestaBDD: data,
          data: this.selectAbogado
        }
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'UPDATE-ABOGADO',
          cambio_json: {
            mensaje: 'Modificación existosa!',
            data: abogadoLog
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.inicio();
        this.logAbogado = {};
        this.notifyService.notify('success', 'Exito', 'Modificación existosa!');
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        let abogadoLog = {
          respuestaBDD: err,
          data: this.abogado
        }
        const log = {

        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('error', 'ERROR', 'Abogado ya existe!');

        if (err.status !== 0) {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-UPDATE-ABOGADO',
            cambio_json: {
              mensaje: 'Abogado-cedula ya existe!',
              data: abogadoLog
            }
          };
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'Abogado ya existe!');
        } else {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-UPDATE-ABOGADO',
            cambio_json: {
              mensaje: 'ERROR DE CONEXIÓN!',
              data: abogadoLog
            }
          }
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
        };

      });
    } else {
      this.blockBotones = this._serviceBotones.blockBotonesGene;
      this.notifyService.notify('error', 'ERROR', 'Revise campos!');
    }
  }
  //#endregion

  //#region CARGAR IMAGEN Y CERRAR, ABRIR FORMULARIO
  // inicializar Objetos
  inicializarCampos() {
    this.selectAbogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: '',
    };
    this.abogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: '',
    };
  }

  // Cerrar formulario
  cancelar() {
    this.inicializarCampos();
    this.showDialog = false;
    this.showDialogMod = false;
    // this.inicio();
  }
  // Cargar imagen
  cargaImagen(file: FileList) {
    this.fileImagen = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlImagen = event.target.result;
    };
    reader.readAsDataURL(this.fileImagen);
  }
  // Mostrar formulario de ingreso.
  showDialogAdd() {
    document.getElementById('cedula').style.borderColor = '';
    document.getElementById('nombre').style.borderColor = '';
    document.getElementById('telefono').style.borderColor = '';
    document.getElementById('mail').style.borderColor = '';
    document.getElementById('direccion').style.borderColor = '';
    this.abogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.selectAbogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0',
      ban5: '0'
    };
    this.showDialog = true;
    this.selectEstado = true;
    this.selectSexo = true;
    this.urlImagen = 'assets/perfil.png';
  }

  // cargar datos de la seleccion de una fila de la tabla y mostrar el formulario de modificar
  onRowSelect(event) {
    document.getElementById('cedulaMod').style.borderColor = '';
    document.getElementById('nombreMod').style.borderColor = '';
    document.getElementById('telefonoMod').style.borderColor = '';
    document.getElementById('mailMod').style.borderColor = '';
    document.getElementById('direccionMod').style.borderColor = '';
    this.bandera = {
      ban1: '1',
      ban2: '1',
      ban3: '1',
      ban4: '1',
      ban5: '1'
    };
    this.selectAbogado = event.data;
    this.logAbogado = event.data;
    this.urlImagen = event.data.foto;
    if (event.data.sexo === 'Hombre') {
      this.selectSexo = true;
    } else {
      this.selectSexo = false;
    }
    if (event.data.estado === 'Activo') {
      this.selectEstado = true;
    } else {
      this.selectEstado = false;
    }
    this.showDialogMod = true;
  }
  //#endregion

  //#region  VALIDACIONES
  // Verifca la cedula
  verificaCedula() {
    if (this.abogado.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.abogado.cedula)) {
        document.getElementById('cedula').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedula').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
      }
    }
    if (this.selectAbogado.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.selectAbogado.cedula)) {
        document.getElementById('cedulaMod').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedulaMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
      }
    }
  }
  // verifica numero de telefono
  verificaTelefono() {
    if (this.abogado.telefono !== '') {
      if (!this.validarService.validateTelefono(this.abogado.telefono)) {
        document.getElementById('telefono').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('telefono').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
      }
    }
    if (this.selectAbogado.telefono !== '') {
      if (!this.validarService.validateTelefono(this.selectAbogado.telefono)) {
        document.getElementById('telefonoMod').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('telefonoMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
      }
    }
  }
  // verifica email
  verificaEmail() {
    if (this.abogado.mail !== '') {
      if (!this.validarService.validateEmail(this.abogado.mail)) {
        document.getElementById('mail').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mail').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
      }
    }
    if (this.selectAbogado.mail !== '') {
      if (!this.validarService.validateEmail(this.selectAbogado.mail)) {
        document.getElementById('mailMod').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mailMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
      }
    }
  }
  // verifica Nombres
  verificaNombres() {
    if (this.abogado.nombre !== '') {
      if (!this.validarService.validateNombres(this.abogado.nombre)) {
        document.getElementById('nombre').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombre').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
      }
    }
    if (this.selectAbogado.nombre !== '') {
      if (!this.validarService.validateNombres(this.selectAbogado.nombre)) {
        document.getElementById('nombreMod').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombreMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
      }
    }
  }
  // verifica dirección
  verificaDireccion() {
    if (this.abogado.direccion !== '') {
      if (!this.validarService.validateDireccion(this.abogado.direccion)) {
        document.getElementById('direccion').style.borderColor = '#FE2E2E';
        this.bandera.ban5 = '0';
      } else {
        document.getElementById('direccion').style.borderColor = '#5ff442'; // green
        this.bandera.ban5 = '1';
      }
    }
    if (this.selectAbogado.direccion !== '') {
      if (!this.validarService.validateDireccion(this.selectAbogado.direccion)) {
        document.getElementById('direccionMod').style.borderColor = '#FE2E2E';
        this.bandera.ban5 = '0';
      } else {
        document.getElementById('direccionMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban5 = '1';
      }
    }
  }
  //#endregion
  // Paginado de la tabla
  validarPaginado() {
    if (this.paginado < 3) {
      this.paginado = 10;
      this.notifyService.notify('error', 'ERROR', 'Paginado mínimo 3.');
    }
  }
}
