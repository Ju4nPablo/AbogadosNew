import { Component, OnInit } from '@angular/core';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { ActividadExtraService } from '../../Services/actividad-extra/actividad-extra.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { EventService } from '../../Services/event/event.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { CalendarModule } from 'primeng/calendar';

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
    'recordatorio': ''
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
  showButton: any = {
    bttnUpdate : true,
    bttnDelete : true
  };
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public abogadoService: AbogadoService,
    public actividadService: ActividadExtraService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService,
    public eventService: EventService
  ) {
    this.inicio();
    /* this.actividadService.urlAcceso().subscribe(data => {
      console.log(data.url);
    }); */
  }
  //#endregion

  //#region INICIO DE VARIABLES

  inicio() {
    const us = JSON.parse(localStorage.getItem('userLogin'));
    if (us) {
      this.showButton = {
        bttnUpdate : false,
        bttnDelete : false
      }
    }
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
      'recordatorio': ''
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
    this.listPrioridad = [
      {
        color: 'red',
        prioridad: 'Alta'
      },
      {
        color: 'yellow',
        prioridad: 'Media'
      },
      {
        color: 'green',
        prioridad: 'Baja'
      }];
    this.selectPrioridad = this.listPrioridad[1];
    // cargar lista de abogados
    this.abogadoService.listAbogado().subscribe(dat => {
      const data: any = dat;
      this.listAbogado = data;
      this.selectAbogado = data[1];
    }, err => {
      console.log(err);
    });

    this.headerConfig = {
      left: 'prevYear,prev,today,next,nextYear ',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,list'
    };
    // carga de actividades al calendario
    this.actividadService.listActividadExtra().subscribe(dat => {
      const data: any = dat;
      this.listActividad = data;
      for (const e of data) {
        this.evento.id = e._id;
        this.evento.title = e.actividad;
        this.evento.start = e.fecha_inicio;
        this.evento.end = e.fecha_fin;
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
  //#endregion

  //#region INGRESAR Y MODIFICAR ACTIVIDAD
  // Ingresa una actividad
  addActividad() {
    if (this.actividad.actividad !== '' && this.actividad.actividad !== null && this.actividad.actividad !== undefined) {
      this.actividad.prioridad = this.selectPrioridad.color;
      this.actividad.abogado = this.selectAbogado._id;
      this.actividad.hora_inicio = this.selectHoraIni.hora;
      this.actividad.hora_fin = this.selectHoraFin.hora;
      this.actividad.repetir = this.selectRepetir.descripcion;
      this.actividad.recordatorio = this.selectRecordatorio.descripcion;
      this.actividadService.addActividadExtra(this.actividad).subscribe(data => {
        this.showDialog = false;
        this.notifyService.notify('success', 'Exito', 'Ingreso Existoso!');
        this.inicio();
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Ingrese una actividad!');
    }
  }
  // Modificar una actividad
  updateActividad() {
    if (this.actividad.id_actividad_caso === 'agenda') {
      this.actividad.prioridad = this.selectPrioridad.color;
      this.actividad.abogado = this.selectAbogado._id;
      this.actividad.hora_inicio = this.selectHoraIni.hora;
      this.actividad.hora_fin = this.selectHoraFin.hora;
      this.actividad.repetir = this.selectRepetir.descripcion;
      this.actividad.recordatorio = this.selectRecordatorio.descripcion;
      this.actividadService.updateActividadExtra(this.actividad).subscribe(data => {
        this.showDialog = false;
        this.notifyService.notify('success', 'Exito', 'Modificación Existosa!');
        this.inicio();
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder modificar!');
    }
  }
  //#endregion

  // Eliminar una actividad
  deleteActividad() {
    if (this.actividad.id_actividad_caso === 'agenda') {
      this.actividadService.deleteActividadExtra(this.actividad).subscribe(data => {
        this.showDialog = false;
        this.notifyService.notify('success', 'Exito', 'Eliminación Existosa!');
        this.inicio();
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Dirígase al caso "' + this.actividad.caso_numero + '" para poder eliminar!');
    }
  }
  //#endregion

  //#region MOSTRAR y CERRAR FORMULARIOS
  // Muestra el fomrulario para ingresar una actividad
  showDialogAdd(event) {
    this.inicio();
    this.showDialog = true;
    this.actividad.fecha_inicio = event.date._d;
    this.actividad.fecha_fin = event.date._d;
  }
  // carga los datos para ser modificados.
  editActividad(event) {
    for (const act of this.listActividad) {
      if (act._id === event.calEvent.id) {
        this.actividad = act;
        this.actividad.fecha_inicio = event.calEvent.start._d;
        this.selectRecordatorio = { descripcion: act.recordatorio };
        this.selectRepetir = { descripcion: act.repetir };
        this.selectHoraIni = { hora: act.hora_inicio };
        this.selectHoraFin = { hora: act.hora_fin };

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
