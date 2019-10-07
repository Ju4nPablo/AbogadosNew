import { Component, OnInit } from '@angular/core';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { ActividadExtraService } from '../../Services/actividad-extra/actividad-extra.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { EventService } from '../../Services/event/event.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { CalendarModule } from 'primeng/calendar';
import { LogCambiosService } from '../../Services/log-Cambios/log-cambios.service';
import { ListaCombosService } from '../../Services/listas-Combos/lista-combos.service';
import { BotonesService } from '../../Services/botones/botones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividad-extra',
  templateUrl: './actividad-extra.component.html',
  styleUrls: ['./actividad-extra.component.css']
})
export class ActividadExtraComponent implements OnInit {

  //#region VARIABLES CREADAS
  events: any[] = [];
  es: any;
  headerConfig: any;
  header: any;
  actividad = {
    'id_actividad_caso': 'agenda',
    'caso_numero': '000',
    'actividad': '',
    'fecha_inicio': '',
    'fecha_fin': '',
    'prioridad': '',
    'abogado': '',
    'hora_inicio': '',
    'hora_fin': '',
    'repetir': '',
    'recordatorio': '',
    'estado': '',
    'id_user': ''
  };
  evento: any = {
    'id': '',
    'title': '',
    'start': '',
    'end': '',
    'color': ''
  };
  hora: any = '';
  showDialog = false;
  showDialogMod = false;
  selectPrioridad: any = '';
  selectAbogado: any = '';
  selectRepetir: any = '';
  selectRecordatorio: any = '';
  selectHoraIni: any = '';
  selectHoraFin: any = '';
  listPrioridad: any[] = [];
  listAbogado: any[] = [];
  listActividad: any[] = [];
  listRepetir: any[] = [];
  listRecordatorio: any[] = [];
  listHoras: any[] = [];
  idActividad: any = '';
  showButton: any = {};
  blockBotones: any = {};
  showCampoAbogado: boolean = false;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public abogadoService: AbogadoService,
    public actividadService: ActividadExtraService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService,
    public eventService: EventService,
    private _serviceLogCambios: LogCambiosService,
    private _serviceListaCombos: ListaCombosService,
    private _serviceBotones: BotonesService,
    private router: Router,
  ) {
    this.showCampoAbogado = false;
    this.inicio();
    /* this.actividadService.urlAcceso().subscribe(data => {
      console.log(data.url);
    }); */
  }
  //#endregion

  //#region INICIO DE VARIABLES

  inicio() {
    let encontrar = false;
    this.blockBotones = this._serviceBotones.blockBotonesGene;
    this.idActividad = '';
    const us = JSON.parse(localStorage.getItem('userLogin'));
    this.showButton = this._serviceBotones.showBotonesActividades;
    this.events = [];
    this.listActividad = [];
    this.selectPrioridad = '';
    this.actividad = {
      'id_actividad_caso': 'agenda',
      'caso_numero': '000',
      'actividad': '',
      'fecha_inicio': '',
      'fecha_fin': '',
      'prioridad': '',
      'abogado': '',
      'hora_inicio': '',
      'hora_fin': '',
      'repetir': '',
      'recordatorio': '',
      'estado': '',
      'id_user': ''
    };
    this.evento = {
      'id': '',
      'title': '',
      'start': '',
      'end': '',
      'color': ''
    };
    this.showDialog = false;
    this.showDialogMod = false;
    this.selectAbogado = '';
    this.selectRepetir = '';
    this.selectRecordatorio = '';
    this.selectHoraIni = '';
    this.selectHoraFin = '';
    this.listPrioridad = this._serviceListaCombos.listaPrioridadActividad;
    this.selectPrioridad = this.listPrioridad[1];
    // cargar lista de abogados
    this.abogadoService.listAbogado().subscribe(dat => {
      const data: any = dat;
      this.listAbogado = data;
      this.selectAbogado = data[1];
      if (us.tipo === '3') {
        for (let abog of this.listAbogado) {
          if (abog.cedula === us.cedula) {
            this.selectAbogado = { ...abog };
            this.showCampoAbogado = false;
            encontrar = true;
            this.cargarActAbogado(us, true);
          }
        }
        if (!encontrar) {
          this.showCampoAbogado = true;
          this.listAbogado.push({ cedula: '0123456789', nombre: 'No registrado' });
          this.selectAbogado = { cedula: '0123456789', nombre: 'No registrado' };
          this.blockBotones.guardar = true;
          this.notifyService.notify('error', 'ERROR', 'Comunicarse con administración para el registro en la sección de abogados.!');
        }
      }
    }, err => {
      console.log(err);
    });

    this.headerConfig = {
      left: 'prevYear,prev,today,next,nextYear ',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,list'
    };
    // carga de actividades al calendario
    if (us.tipo === '1') {
      this.actividadService.listActividadExtra().subscribe(dat => {
        const data: any = dat;
        this.listActividad = data;
        for (const e of data) {
          let fi = e.fecha_inicio.split('T');
          let ff = e.fecha_inicio.split('T');
          this.evento.id = e._id;
          this.evento.title = e.actividad;
          this.evento.start = fi[0];
          this.evento.end = ff[0];
          this.evento.color = e.prioridad;
          this.events.push(this.evento);
          this.evento = {
            'id': '',
            'title': '',
            'start': '',
            'end': '',
            'color': ''
          };
        }
      });
    }
    if (us.tipo === '2') {
      this.router.navigateByUrl('/dashboard/caso');
    }

    this.listRepetir = [{ descripcion: 'Nunca' }, { descripcion: 'Todos los días' }, { descripcion: 'Todas las semanas' },
    { descripcion: 'Todos los meses' }, { descripcion: 'Todos los años' }];
    this.listRecordatorio = [{ descripcion: 'Nunca' }, { descripcion: '5 minutos antes' }, { descripcion: '15 minutos antes' },
    { descripcion: '30 minutos antes' }, { descripcion: '1 hora antes' }, { descripcion: '2 horas antes' }];
    this.selectRepetir = this.listRepetir[0];
    this.selectRecordatorio = this.listRecordatorio[0];
    /* this.listHoras = [{ hora: '00:00' }, { hora: '00:30' }, { hora: '01:00' }, { hora: '01:30' }, { hora: '02:00' }, { hora: '02:30' },
    { hora: '03:00' }, { hora: '03:30' }, { hora: '04:00' }, { hora: '04:30' }, { hora: '05:00' }, { hora: '05:30' }, { hora: '06:00' },
    { hora: '06:30' }, { hora: '07:00' }, { hora: '07:30' }, { hora: '08:00' }, { hora: '08:30' }, { hora: '09:00' }, { hora: '09:30' },
    { hora: '10:00' }, { hora: '10:30' }, { hora: '11:00' }, { hora: '11:30' }, { hora: '12:00' }, { hora: '12:30' }, { hora: '13:00' },
    { hora: '13:30' }, { hora: '14:00' }, { hora: '14:30' }, { hora: '15:00' }, { hora: '15:30' }, { hora: '16:00' }, { hora: '16:30' },
    { hora: '17:00' }, { hora: '17:30' }, { hora: '18:00' }, { hora: '18:30' }, { hora: '19:00' }, { hora: '19:30' }, { hora: '20:00' },
    { hora: '20:30' }, { hora: '21:00' }, { hora: '21:30' }, { hora: '22:00' }, { hora: '22:30' }, { hora: '23:00' }, { hora: '23:30' }]; */
    this.listHoras = [{ hora: '08:00' }, { hora: '08:30' }, { hora: '09:00' }, { hora: '09:30' }, { hora: '10:00' }, { hora: '10:30' },
    { hora: '11:00' }, { hora: '11:30' }, { hora: '12:00' }, { hora: '12:30' }, { hora: '13:00' }, { hora: '13:30' }, { hora: '14:00' },
    { hora: '14:30' }, { hora: '15:00' }, { hora: '15:30' }, { hora: '16:00' }, { hora: '16:30' },
    { hora: '17:00' }, { hora: '17:30' }, { hora: '18:00' }];
    this.selectHoraIni = this.listHoras[8];
    this.selectHoraFin = this.listHoras[9];
  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
        'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar'
    };
  }

  cargarActAbogado(us, cargar) {
    if (cargar) {
      this.actividadService.listActividadExtraPorCedulaUsuario({ cedula: us.cedula, id_user: us._id }).subscribe(dat => {
        const data: any = dat;
        this.listActividad = data;
        for (const e of data) {
          let fi = e.fecha_inicio.split('T');
          let ff = e.fecha_inicio.split('T');
          this.evento.id = e._id;
          this.evento.title = e.actividad;
          this.evento.start = fi[0];
          this.evento.end = ff[0];
          this.evento.color = e.prioridad;
          this.events.push(this.evento);
          this.evento = {
            'id': '',
            'title': '',
            'start': '',
            'end': '',
            'color': ''
          };
        }
      });
    }
  }
  //#endregion

  //#region INGRESAR, MODIFICAR, ELIMINAR Y RESTAURAR ACTIVIDAD
  // Ingresa una actividad
  addActividad() {
    this.blockBotones = this._serviceBotones.disabledBotonesGene;
    if (this.actividad.actividad !== '' && this.actividad.actividad !== null && this.actividad.actividad !== undefined) {
      this.actividad.prioridad = this.selectPrioridad.color;
      this.actividad.abogado = this.selectAbogado._id;
      this.actividad.hora_inicio = this.selectHoraIni.hora;
      this.actividad.hora_fin = this.selectHoraFin.hora;
      this.actividad.repetir = this.selectRepetir.descripcion;
      this.actividad.recordatorio = this.selectRecordatorio.descripcion;
      this.actividad.estado = 'Activo';
      this.actividad.id_user = JSON.parse(localStorage.getItem('userLogin'))._id;
      this.actividadService.addActividadExtra(this.actividad).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        this.showDialog = false;
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'ADD-ACTIVIDAD',
          cambio_json: {
            mensaje: 'Ingreso Existoso!',
            data: data
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('success', 'Exito', 'Ingreso Existoso!');
        this.inicio();
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        let actividadLog = {
          respuestaBDD: err,
          data: this.actividad
        }

        if (err.status !== 0) {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ADD-ACTIVIDAD',
            cambio_json: {
              mensaje: 'Error al Ingresar!',
              data: actividadLog
            }
          };
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'Error al Ingresar!');
        } else {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ADD-ACTIVIDAD',
            cambio_json: {
              mensaje: 'ERROR DE CONEXIÓN!',
              data: actividadLog
            }
          }
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
        };

      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Ingrese una actividad!');
    }
  }
  // Modificar una actividad
  updateActividad() {
    this.blockBotones = this._serviceBotones.disabledBotonesGene;
    if (this.actividad.id_actividad_caso === 'agenda') {
      this.actividad.prioridad = this.selectPrioridad.color;
      this.actividad.abogado = this.selectAbogado._id;
      this.actividad.hora_inicio = this.selectHoraIni.hora;
      this.actividad.hora_fin = this.selectHoraFin.hora;
      this.actividad.repetir = this.selectRepetir.descripcion;
      this.actividad.recordatorio = this.selectRecordatorio.descripcion;
      this.actividad.estado = 'Activo'
      this.actividadService.updateActividadExtra(this.actividad).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        this.showDialog = false;
        let actividadLog = {
          respuestaBDD: data,
          data: this.actividad
        };
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'UPDATE-ACTIVIDAD',
          cambio_json: {
            mensaje: 'Modificación Existosa!',
            data: actividadLog
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('success', 'Exito', 'Modificación Existosa!');
        this.inicio();
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        let actividadLog = {
          respuestaBDD: err,
          data: this.actividad
        };

        if (err.status !== 0) {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-UPDATE-ACTIVIDAD',
            cambio_json: {
              mensaje: 'Error al Modificar!',
              data: actividadLog
            }
          };
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'Error al Modificar!');
        } else {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-UPDATE-ACTIVIDAD',
            cambio_json: {
              mensaje: 'ERROR DE CONEXIÓN!',
              data: actividadLog
            }
          }
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
        };
      });
    } else {
      this.blockBotones = this._serviceBotones.blockBotonesGene;
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-UPDATE-ACTIVIDAD',
        cambio_json: {
          mensaje: 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder modificar!',
          data: this.actividad
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      this.notifyService.notify('error', 'ERROR', 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder modificar!');
    }
  }

  // Eliminar una actividad
  deleteActividad(event) {
    this.blockBotones = this._serviceBotones.disabledBotonesGene;
    this.actividad.estado = 'Eliminado';
    this.actividad.prioridad = 'gray';
    let cambio = {
      id: this.idActividad,
      estado: this.actividad.estado,
      prioridad: this.actividad.prioridad
    }
    if (this.actividad.id_actividad_caso === 'agenda') {
      this.actividadService.deleteActividadExtraIdEstado(cambio).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        this.showDialog = false;
        let actividadLog = {
          respuestaBDD: data,
          data: cambio
        };
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'DELETE-ACTIVIDAD',
          cambio_json: {
            mensaje: 'Eliminación Existosa!',
            data: actividadLog
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('success', 'Exito', 'Eliminación Existosa!');
        this.inicio();
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        let actividadLog = {
          respuestaBDD: err,
          data: cambio
        };

        if (err.status !== 0) {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-DELETE-ACTIVIDAD',
            cambio_json: {
              mensaje: 'ERROR al Eliminar!',
              data: actividadLog
            }
          };
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR al Eliminar!');
        } else {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-DELETE-ACTIVIDAD',
            cambio_json: {
              mensaje: 'ERROR DE CONEXIÓN!',
              data: actividadLog
            }
          }
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
        };
      });
    } else {
      this.blockBotones = this._serviceBotones.blockBotonesGene;
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-DELETE-ACTIVIDAD',
        cambio_json: {
          mensaje: 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder eliminar!',
          data: cambio
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      this.notifyService.notify('error', 'ERROR', 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder eliminar!');
    }
  }

  // Eliminar una actividad
  restaurarActividad() {
    this.blockBotones = this._serviceBotones.disabledBotonesGene;
    this.actividad.estado = 'Activo';
    this.actividad.prioridad = 'yellow';
    let cambio = {
      id: this.idActividad,
      estado: this.actividad.estado,
      prioridad: this.actividad.prioridad
    }
    if (this.actividad.id_actividad_caso === 'agenda') {
      this.actividadService.deleteActividadExtraIdEstado(cambio).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        this.showDialog = false;
        let actividadLog = {
          respuestaBDD: data,
          data: cambio
        };
        this.showButton = {
          bttnUpdate: true,
          bttnDelete: true,
          bttnRestaurar: false
        }
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'RESTAURAR-ACTIVIDAD',
          cambio_json: {
            mensaje: 'Restauración Existosa!',
            data: actividadLog
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('success', 'Exito', 'Restauración Existosa!');
        this.inicio();
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotonesGene;
        let actividadLog = {
          respuestaBDD: err,
          data: cambio
        };

        if (err.status !== 0) {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-RESTAURAR-ACTIVIDAD',
            cambio_json: {
              mensaje: 'ERROR al Restaurar!',
              data: actividadLog
            }
          };
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR al Restaurar!');
        } else {
          let log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-RESTAURAR-ACTIVIDAD',
            cambio_json: {
              mensaje: 'ERROR DE CONEXIÓN!',
              data: actividadLog
            }
          }
          this._serviceLogCambios.addLogCambio(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'ERROR DE CONEXIÓN!');
        };
      });
    } else {
      this.blockBotones = this._serviceBotones.blockBotonesGene;
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-RESTAURAR-ACTIVIDAD',
        cambio_json: {
          mensaje: 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder eliminar!',
          data: cambio
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      this.notifyService.notify('error', 'ERROR', 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder eliminar!');
    }
  }

  //#endregion

  //#region MOSTRAR y CERRAR FORMULARIOS
  // Muestra el fomrulario para ingresar una actividad
  showDialogAdd(event) {
    // this.inicio();
    this.showDialog = true;
    this.actividad.fecha_inicio = event.date._d;
    this.actividad.fecha_fin = event.date._d;
  }
  // carga los datos para ser modificados.
  editActividad(event) {
    for (const act of this.listActividad) {
      if (act._id === event.calEvent.id) {
        this.idActividad = act._id;
        this.actividad = act;
        this.actividad.fecha_inicio = event.calEvent.start._d;
        this.selectRecordatorio = { descripcion: act.recordatorio };
        this.selectRepetir = { descripcion: act.repetir };
        this.selectHoraIni = { hora: act.hora_inicio };
        this.selectHoraFin = { hora: act.hora_fin };

        if (act.estado === 'Eliminado') {
          this.showButton = this._serviceBotones.showBotonEliminarActividad;
        }
        if (event.calEvent.end !== null) {
          this.actividad.fecha_fin = event.calEvent.end._d;
        } else {
          this.actividad.fecha_fin = event.calEvent.start._d;
        }
        for (const pri of this.listPrioridad) {
          if (pri.color === act.prioridad) {
            this.selectPrioridad = pri;
          }
        }
        for (const ab of this.listAbogado) {
          if (ab._id === act.abogado) {
            this.selectAbogado = ab;
          }
        }
        this.showDialogMod = true;
      }
    }
  }
  // Ocualta los formularios
  cancelar() {
    this.showDialog = false;
    this.showDialogMod = false;
    this.inicio();
  }
  //#endregion

  //#region VALIDADCIONES
  // Validar la actividad solo letras:
  verificaActividad() {
    if (this.actividad.actividad !== '') {
      if (this.actividad.actividad.length < 5) {
        document.getElementById('actividad').style.borderColor = '#FE2E2E';
      } else {
        document.getElementById('actividad').style.borderColor = '#5ff442'; // green
      }
    }
    /* if (this.actividad.actividad !== '') {
      if (!this.validarService.validateNombres(this.actividad.actividad)) {
        document.getElementById('nombreMod').style.borderColor = '#FE2E2E';
      } else {
        document.getElementById('nombreMod').style.borderColor = '#5ff442'; // green
      }
    } */
  }
  // Validar campos nunlos
  validadCampoNulos() {
    if (this.actividad.actividad !== '' && this.actividad.fecha_inicio !== '' && this.actividad.fecha_fin !== '') {
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
