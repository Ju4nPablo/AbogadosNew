import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { BotonesService } from '../../Services/botones/botones.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  listCaso: any = [];
  listAbogado: any = [];
  listCliente: any = [];
  listEstado: any = [];
  fechaInicio: any = '';
  fechaFin: any = '';
  cols: any[];
  es: any;
  msgs: any = [];
  selectCliente: any = '';
  selectAbogado: any = '';
  selectEstado: any = '';
  blockBotones: any = {};

  constructor(
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    private notifyService: NotificacionesService,
    private _serviceBotones: BotonesService,
  ) {
    this.inicio();
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

  inicio() {
    this.blockBotones = this._serviceBotones.blockBotonesReport;
    this.listCaso = [];
    this.listAbogado = [];
    this.listCliente = [];
    this.fechaInicio = '';
    this.fechaFin = '';
    this.clienteService.getClienteTipo().subscribe(data => {
      this.listCliente = data;
      this.listCliente.unshift({ _id: '-1', nombre: 'Todos' });
      this.selectCliente = this.listCliente[0];
    });
    this.abogadoService.getAbogadoTipo().subscribe(data => {
      this.listAbogado = data;
      this.listAbogado.unshift({ _id: '-1', nombre: 'Todos' });
      this.selectAbogado = this.listAbogado[0];
    });
    this.listEstado = [
      {
        id: '-1',
        estado: 'Todos'
      },
      {
        id: '1',
        estado: 'Pendiente'
      },
      {
        id: '2',
        estado: 'Abandono'
      },
      {
        id: '3',
        estado: 'Terminado'
      }
    ];
    this.selectEstado = this.listEstado[0];
    this.cols = [
      { field: 'label', header: 'Número caso' },
      { field: 'abogado', header: 'Abogado' },
      { field: 'cliente', header: 'Cliente' },
      { field: 'estado', header: 'Estado' },
      { field: 'fecha', header: 'Fecha Inicio' },
      //{ field: 'fechaFin', header: 'Fecha Fin' },
    ];
  }

  onSelectFechaIncicio($event) {
    if (this.fechaFin === '' || this.fechaFin === null) {
      this.notifyService.notify('error', 'ERROR', 'Fecha de fin esta vacio!');
      return;
    }
    if ($event > new Date()) {
      this.notifyService.notify('error', 'ERROR', 'Excede al rango de la fecha actual!');
      return;
    }
    if ($event > this.fechaFin) {
      this.notifyService.notify('error', 'ERROR', 'Rango de fecha incorrecto!');
      return;
    }
  }

  onSelectFechaFin($event) {
    if (this.fechaInicio === '' || this.fechaInicio === null) {
      this.notifyService.notify('error', 'ERROR', 'Fecha de inicio esta vacio!');
      return;
    }
    if ($event < this.fechaInicio) {
      this.notifyService.notify('error', 'ERROR', 'Rango de fecha incorrecto!');
      return;
    }
  }

  generar() {
    //this.blockBotones = this._serviceBotones.disabledBotonesReport;
    this.listCaso = [];
    // rango de fechas

    // Validacion de fechas fechas
    if (this.fechaInicio == '' || this.fechaFin == '' || this.fechaInicio == '' || this.fechaFin == '') {
      this.fechaInicio = '';
      this.fechaFin = '';
      this.notifyService.notify('error', 'ERROR', 'Campos vacios en fechas!');
    }

    // todos
    if (this.selectEstado.id === '-1' && this.selectAbogado._id === '-1' && this.selectCliente._id === '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      this.casoService.allCaso().subscribe(data => {
        this.cargarTabla(data);
      });
    }

    // todos rango de fechas.
    if (this.selectEstado.id === '-1' && this.selectAbogado._id === '-1' && this.selectCliente._id === '-1' && this.fechaInicio !== '' &&
      this.fechaFin !== '' && this.fechaFin >= this.fechaInicio) {
      const fechas = {
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
      };
      this.casoService.allCasoFechas(fechas).subscribe(data => {
        this.cargarTabla(data);
      });
    }

    // Abogado
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id === '-1' && this.selectEstado.id === '-1') {
      const abo = {
        idAbogado: this.selectAbogado._id,
        fecha_inicio: this.fechaInicio,
        fecha_fin: this.fechaFin
      };
      this.casoService.allCasoAbogado(abo).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // Abogado y estado
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id === '-1' && this.selectEstado.id !== '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      const abo = {
        idAbogado: this.selectAbogado._id,
        idEstado: this.selectEstado.id
      };
      this.casoService.allCasoAbogadoEstado(abo).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // Cliente
    if (this.selectAbogado._id === '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id === '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      const cli = {
        idCliente: this.selectCliente._id
      };
      this.casoService.allCasoCliente(cli).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // Cliente y estado
    if (this.selectAbogado._id === '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id !== '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      const cli = {
        idCliente: this.selectCliente._id,
        idEstado: this.selectEstado.id
      };
      this.casoService.allCasoClienteEstado(cli).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // Abogado y cliente
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id === '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      const obj = {
        idCliente: this.selectCliente._id,
        idAbogado: this.selectAbogado._id
      };
      this.casoService.allCasoAbogadoCliente(obj).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // Estados
    if (this.selectAbogado._id === '-1' && this.selectCliente._id === '-1' && this.selectEstado.id !== '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      this.casoService.allCasoEstado(this.selectEstado).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // cliente abogado estado
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id !== '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      const obj = {
        idCliente: this.selectCliente._id,
        idAbogado: this.selectAbogado._id,
        idEstado: this.selectEstado.id
      };
      this.casoService.allCasoAbogadoClienteEstado(obj).subscribe(data => {
        this.cargarTabla(data);
      });
    }
    // Abogado cliente sin estado y fechas
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id === '-1' && this.fechaInicio !== '' &&
      this.fechaFin !== '' && this.fechaInicio <= this.fechaFin) {
      this.onSelectFechaIncicio(this.fechaInicio);
      this.onSelectFechaFin(this.fechaFin);
      const obj = {
        idCliente: this.selectCliente._id,
        idAbogado: this.selectAbogado._id,
        idEstado: this.selectEstado.id,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
      };
      this.casoService.allCasoAbogadoClienteFecha(obj).subscribe(data => {
        this.cargarTabla(data);
      });
    }

    // Abogado cliente estado y fechas
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id !== '-1' && this.fechaInicio !== '' &&
      this.fechaFin !== '' && this.fechaInicio <= this.fechaFin) {
      this.onSelectFechaIncicio(this.fechaInicio);
      this.onSelectFechaFin(this.fechaFin);
      const obj = {
        idCliente: this.selectCliente._id,
        idAbogado: this.selectAbogado._id,
        idEstado: this.selectEstado.id,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin
      };
      this.casoService.allCasoAbogadoClienteEstadoFecha(obj).subscribe(data => {
        this.cargarTabla(data);
      });
    }

  }

  cargarTabla(lista) {
    lista.forEach(item => {
      // let cli = this.buscarCliente(item.data.cliente.cedula);
      let fech = new Date(item.data.fecha_inicio);
      let fec = fech.getDate() + "/" + (((fech.getMonth() + 1) < 10) ? ('0' + (fech.getMonth() + 1)) : (fech.getMonth() + 1)) + "/" + fech.getFullYear();
      this.listCaso.push({
        id: item._id,
        label: item.label,
        cliente: item.data.cliente.nombre,
        abogado: item.data.abogado.nombre,
        estado: item.data.estado.estado,
        fecha: fec,
      });
    });
  }

}
