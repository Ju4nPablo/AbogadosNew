import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';


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

  constructor(
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    private notifyService: NotificacionesService
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
    ];
  }

  generar() {
    // todos
    if (this.selectEstado.id === '-1' && this.selectAbogado._id === '-1' && this.selectCliente._id === '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
      this.casoService.allCaso().subscribe(data => {
        this.listCaso = data;
      });
    }
    // Abogado
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id === '-1' && this.selectEstado.id === '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
        const abo = {
          idAbogado: this.selectAbogado._id
        };
        this.casoService.allCasoAbogado(abo).subscribe(data => {
          this.listCaso = data;
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
          this.listCaso = data;
        });
    }
    // Cliente
    if (this.selectAbogado._id === '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id === '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
        const cli = {
          idCliente: this.selectCliente._id
        };
        this.casoService.allCasoCliente(cli).subscribe(data => {
          this.listCaso = data;
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
          this.listCaso = data;
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
          this.listCaso = data;
        });
    }
    // Estados
    if (this.selectAbogado._id === '-1' && this.selectCliente._id === '-1' && this.selectEstado.id !== '-1' && this.fechaInicio === '' &&
      this.fechaFin === '') {
        this.casoService.allCasoEstado(this.selectEstado).subscribe(data => {
          this.listCaso = data;
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
          this.listCaso = data;
        });
    }
    // Abogado cliente y fechas
    if (this.selectAbogado._id !== '-1' && this.selectCliente._id !== '-1' && this.selectEstado.id !== '-1' && this.fechaInicio !== '' &&
      this.fechaFin !== '' && this.fechaInicio <= this.fechaFin) {
        const obj = {
          idCliente: this.selectCliente._id,
          idAbogado: this.selectAbogado._id,
          idEstado: this.selectEstado.id,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin
        };
        this.casoService.allCasoAbogadoClienteEstadoFecha(obj).subscribe(data => {
          this.listCaso = data;
        });
    }
  }

}
