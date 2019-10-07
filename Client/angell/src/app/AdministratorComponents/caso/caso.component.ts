import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { SendEmailService } from '../../Services/send-email/send-email.service';
import { ActividadExtraService } from '../../Services/actividad-extra/actividad-extra.service';
import { nodeValue } from '@angular/core/src/view';
import { LogCambiosService } from '../../Services/log-Cambios/log-cambios.service';
import { ListaCombosService } from '../../Services/listas-Combos/lista-combos.service';
import { BotonesService } from '../../Services/botones/botones.service';
import { EtiquetasService } from '../../Services/etiquetas/etiquetas.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';

@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.css']
})
export class CasoComponent implements OnInit {

  //#region Variables e inicios
  fileImagen: File = null;
  urlImagen1: any = 'assets/papel.png';
  urlImagen2: any = 'assets/papel.png';
  urlImagen3: any = 'assets/papel.png';
  urlImagen: any = '';
  listCaso: any = [];
  listTabla: any = [];
  listCliente: any = [];
  listAbogado: any = [];
  filesImagens: any = [];
  cols: any[];
  es: any;
  casoTree: TreeNode[];
  selectProceso: any = {};
  // selectNode: any = {};
  // Variables nuevas
  msgs: any = [];
  selectNode: TreeNode;
  node: any;
  showDialog: Boolean = false;
  showDialogMod: Boolean = false;
  showDialogHijos: Boolean = false;
  showDialogImagenes: Boolean = false;
  showDialogMail: Boolean = false;
  showDialogMailCliente: Boolean = false;
  showImagen: Boolean = false;
  caso: any = {};
  listEstado: any = [];
  idCaso: any = '';

  numCaso: any = '';
  fechaInicio: any = '';
  fechaFin: any = '';
  selectEstado: any = {};
  selectCliente: any = {};
  selectAbogado: any = {};
  info: any = '';
  infoNodo: any = '';
  cliente: any = '';
  blockCampos: any = {};
  showButon: any = {};
  numeroCaso: any = '';

  // agregar caso nuevo.
  showDialogIng: any = false;
  showDialogIngNodo: any = false;
  showDialogIngNodoHijo: any = false;
  casoTreeInsert: TreeNode[];
  nodeInsert: any;
  banValidar: any = '';
  activaBotonGuardarCaso: boolean = false;

  visibleCampos: any = {};
  selectHoraIni: any = '';
  listHoras: any[] = [];
  datosMail: any = {};
  listActividadEliminar: any = [];
  listActividadIngresar: any = [];
  etiquetasFormCaso: any = {};
  etiquetasBotones: any = {};
  blockBotones: any = {};
  totalRecords: number;
  paginado: number = 10;
  bodyCliente: any = '';

  loading: boolean;

  constructor(
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    private notifyService: NotificacionesService,
    private sendEmailService: SendEmailService,
    private actividadAgenda: ActividadExtraService,
    private _serviceLogCambios: LogCambiosService,
    private _serviceListaCombos: ListaCombosService,
    private _serviceBotones: BotonesService,
    private _serviceEtiquetas: EtiquetasService,
    public validarService: ValidacioneService,
  ) {
    this.inicio();
  }

  inicio() {
    this.bodyCliente = '';
    this.paginado = 10;
    this.showDialogIng = false;
    this.listHoras = this._serviceListaCombos.listacomboHoras;
    this.selectHoraIni = this.listHoras[1];
    this.listActividadEliminar = [];
    this.listActividadIngresar = [];
    this.etiquetasFormCaso = {};
    this.etiquetasBotones = {};
    this.blockBotones = this._serviceBotones.blockBotones;

    this.datosMail = {
      para: [],
      asunto: '',
      body: '',
    };

    const us = JSON.parse(localStorage.getItem('userLogin'));
    this.listCaso = [];
    this.listAbogado = [];
    this.listCliente = [];
    this.listTabla = [];
    this.filesImagens = [];
    this.urlImagen1 = 'assets/papel.png';
    this.urlImagen2 = 'assets/papel.png';
    this.urlImagen3 = 'assets/papel.png';
    this.urlImagen = '';
    this.clienteService.getClienteTipo().subscribe(data => {
      this.listCliente = data;
      this.selectCliente = this.listCliente[0];
    });
    this.abogadoService.getAbogadoTipo().subscribe(data => {
      this.listAbogado = data;
      this.selectAbogado = this.listAbogado[0];
    });
    if (us.tipo === '1') {
      this.visibleCampos = this._serviceBotones.visibleCamposAdministrador;
      this.etiquetasFormCaso = this._serviceEtiquetas.etiquetasCasoAdministrador;
      this.etiquetasBotones = this._serviceBotones.etiquetasBotonesAdministrador;
      this.casoService.allCasoPendientes().subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
        this.cargarCaso();
      });
      this.blockCampos = this._serviceBotones.bloquearCamposAdministrador;
      this.showButon = this._serviceBotones.visibleBotonesAdministrador;
    }
    if (us.tipo === '2') {  //cliente
      this.visibleCampos = this._serviceBotones.visibleCamposCliente;
      this.etiquetasFormCaso = this._serviceEtiquetas.etiquetasCasoCliente;
      this.etiquetasBotones = this._serviceBotones.etiquetasBotonesCliente;
      const obj = {
        cedula: us.cedula
      };
      this.casoService.AllCasoClientePendiente(obj).subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
      });
      this.blockCampos = this._serviceBotones.bloquearCamposCliente;
      this.showButon = this._serviceBotones.visibleBotonesCliente;
    }
    if (us.tipo === '3') { //abogado
      this.visibleCampos = this._serviceBotones.visibleCamposAbogado;
      this.etiquetasFormCaso = this._serviceEtiquetas.etiquetasCasoAbogado;
      this.etiquetasBotones = this._serviceBotones.etiquetasBotonesAbogado;
      const obj = {
        cedula: us.cedula
      };
      this.casoService.AllCasoAbogadoPendiente(obj).subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
        this.cargarCaso();
      });
      this.blockCampos = this._serviceBotones.bloquearCamposAbogado;
      this.showButon = this._serviceBotones.visibleBotonesAbogado;
    }
    this.cols = [
      { field: 'numeroCarpeta', header: 'Número Carpeta' },
      { field: 'cliente', header: 'Cliente' },
      { field: 'label', header: 'Número caso' },
      { field: 'abogado', header: 'Abogado' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'estado', header: 'Estado' },
    ];
    this.selectProceso = {};
    // Agregados
    this.listEstado = this._serviceListaCombos.listacomboEstadoCaso;
    this.node = {
      label: '',
      data: {
        id: '',
        codigo: '',
        descripcion: '',
        cliente: '',
        abogado: '',
        fecha: '',
        estado: this.listEstado[0],
        imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
      }
    };
    this.nodeInsert = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        hora_inicio: '09:00',
        precio: 0,
        ingresar_actividad: false,
        validar_diligencia: false,
        modificar_actividad: false,
        descripcion_Administrador: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        cliente: '',
        abogado: '',
        imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
        estado: this.listEstado[0]
      }
    };
    this.selectEstado = this.listEstado[0];
    this.showDialog = false;
    this.showDialogHijos = false;
    this.showDialogMod = false;
    this.showDialogImagenes = false;
    this.showImagen = false;
    this.showDialogMail = false;
    this.showDialogMailCliente = false;
    this.caso = {};
    this.idCaso = '';
    this.info = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        hora_inicio: '09:00',
        precio: 0,
        ingresar_actividad: false,
        validar_diligencia: false,
        modificar_actividad: false,
        descripcion_Administrador: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        cliente: '',
        abogado: '',
        imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
        estado: this.listEstado[0]
      }
    };
    this.infoNodo = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        hora_inicio: '09:00',
        precio: 0,
        ingresar_actividad: false,
        validar_diligencia: false,
        modificar_actividad: false,
        descripcion_Administrador: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        cliente: '',
        abogado: '',
        imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
        estado: this.listEstado[0]
      }
    };
    this.cliente = '';
    this.banValidar = false;
  }

  cargarCaso() {
    const caso = JSON.parse(localStorage.getItem('caso'));
    if (caso !== null && caso !== '' && caso !== undefined) {
      this.idCaso = caso._id;
      this.cliente = this.buscarCliente(caso.data.cliente.cedula);
      this.casoTree = [caso];
      this.expandAll();
      this.blockBotones.contraer = false;
      this.blockBotones.expandir = true;
      this.showDialogMod = true;
      this.showDialogMod = true;
      localStorage.setItem('caso', null);
    }
  }

  cargarTabla(lista) {
    this.loading = true;
    let cont = 0;
    this.totalRecords = lista.length;
    if (lista.length > 0) {

      setTimeout(() => {
        for (let item of lista) {
          cont++;
          // let cli = this.buscarCliente(item.data.cliente.cedula);
          let fech = new Date(item.data.fecha_inicio);
          let fec = fech.getDate() + "/" + (((fech.getMonth() + 1) < 10) ? ('0' + (fech.getMonth() + 1)) : (fech.getMonth() + 1)) + "/" + fech.getFullYear();
          this.listTabla.push({
            id: item._id,
            label: item.label,
            cliente: item.data.cliente.nombre,
            abogado: item.data.abogado.nombre,
            numeroCarpeta: this.buscarCliente(item.data.cliente.cedula).numeroCarpeta,
            fecha: fec,
            estado: item.data.estado.estado
          });
          if (cont === this.totalRecords) {
            this.loading = false;
          };
        };
      }, 2000);
    } else {
      this.notifyService.notify('error', 'ERROR', 'NO EXISTEN REGISTROS!');
      this.loading = false;
    };
  };

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

    this.casoTreeInsert = [
      {
        label: 'Nombre del flujo',
        data: {
          id: this.generarID(),
          fecha_inicio: new Date(),
          fecha_fin: new Date(),
          hora_inicio: '09:00',
          precio: 0,
          ingresar_actividad: false,
          validar_diligencia: false,
          modificar_actividad: false,
          descripcion_Administrador: '',
          descripcion_abogado: '',
          descripcion_cliente: '',
          abogado: this.listAbogado[0],
          cliente: this.listCliente[0],
          imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
          estado: this.listEstado[0]
        },
        children: []
      }
    ];

  }
  //#endregion

  selectItem(event) {
    this.numeroCaso = '';
    this.listCaso.forEach(item => {
      if (item._id === event.data.id) {
        this.showDialogMod = true;
        this.idCaso = item._id;
        this.cliente = this.buscarCliente(item.data.cliente.cedula);
        this.casoTree = [item];
        this.listActividadEliminar = [];
        this.listActividadIngresar = [];
        this.expandAll();
        this.blockBotones.contraer = false;
        this.blockBotones.expandir = true;
      }
    });
  }
  ///////////////////////////////////////////////////////////
  //#region Ingresar nuevo caso
  saveCaso() {
    this.blockBotones = this._serviceBotones.disabledBotonesCaso;
    this.verificarCasoRecursive(this.casoTreeInsert[0]);
    if (this.banValidar) {
      const casoSave = {
        label: this.casoTreeInsert[0].label,
        data: this.casoTreeInsert[0].data,
        children: this.casoTreeInsert[0].children
      };
      this.numeroCaso = this.casoTreeInsert[0].label;
      this.casoService.addCaso(casoSave).subscribe(data => {
        this.blockBotones = this._serviceBotones.blockBotones;
        this.recorrerAddActividades(this.casoTreeInsert[0]);
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'ADD-CASO',
          cambio_json: {
            mensaje: 'Ingreso existoso!',
            data: data
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.inicio();
        this.ngOnInit();
        this.notifyService.notify('success', 'Exito', 'INGRESO EXITOSO!');
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotones;
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'ERROR-ADD-CASO',
          cambio_json: {
            mensaje: 'ERROR AL INGRESAR!',
            data: casoSave
          }
        }
        this._serviceLogCambios.addLogCambio(log).subscribe();
        this.notifyService.notify('error', 'ERROR', 'ERROR AL INGRESAR!');
      });
    } else {
      this.blockBotones = this._serviceBotones.blockBotones;
      this.notifyService.notify('error', 'ERROR', 'EXISTEN CAMPOS VACÍOS!');
    }
  }

  // recorrer el nodo para guardar las actividades.
  recorrerAddActividades(nodoActividad: TreeNode) {
    const act = {
      label: nodoActividad.label,
      data: nodoActividad.data
    };
    if (nodoActividad.data.ingresar_actividad)
      this.addActividad(act);
    if (nodoActividad.children) {
      nodoActividad.children.forEach(childNode => {
        this.recorrerAddActividades(childNode);
      });
    }
  }

  // Guadar actividad en la agenda.
  addActividad(datosCalendario) {
    const actividad = {
      'id_actividad_caso': datosCalendario.data.id.toString(),
      'caso_numero': this.numeroCaso,
      'actividad': datosCalendario.label,
      'fecha_inicio': datosCalendario.data.fecha_inicio,
      'fecha_fin': datosCalendario.data.fecha_fin,
      'prioridad': 'yellow',
      'abogado': datosCalendario.data.abogado.id,
      'hora_inicio': datosCalendario.data.hora_inicio,
      'hora_fin': '18:00',
      'repetir': 'Nunca',
      'recordatorio': '1 hora antes',
      'estado': 'Activo',
      'id_user': JSON.parse(localStorage.getItem('userLogin'))._id
    };
    this.actividadAgenda.addActividadExtra(actividad).subscribe(data => {
      // this.numeroCaso = '';
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ADD-ACTIVIDAD',
        cambio_json: {
          mensaje: 'Ingreso existoso!',
          data: actividad
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe(data => {
      });
    }, err => {
      // this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-ADD-ACTIVIDAD',
        cambio_json: {
          mensaje: 'ERROR AL INGRESAR ACTIVIDAD!',
          data: actividad
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe(data => {
      });
    });
  }

  showDialogAdd() {
    this.casoTreeInsert = [
      {
        label: 'Numero Caso',
        data: {
          id: this.generarID(),
          fecha_inicio: new Date(),
          fecha_fin: new Date(),
          hora_inicio: '09:00',
          precio: 0,
          ingresar_actividad: false,
          validar_diligencia: false,
          modificar_actividad: false,
          descripcion_Administrador: '',
          descripcion_abogado: '',
          descripcion_cliente: '',
          abogado: this.listAbogado[0],
          cliente: this.listCliente[0],
          imagenes: [],
          estado: this.listEstado[0]
        },
        children: []
      }
    ];
    this.showDialogIng = true;
  }

  selectNodoIng(event) {
    if (event.node.data.imagenes.length === 0) {
      event.node.data.imagenes = ['assets/papel.png', 'assets/papel.png', 'assets/papel.png']
    }
    this.fechaInicio = new Date(event.node.data.fecha_inicio);
    this.fechaFin = new Date(event.node.data.fecha_fin);
    this.caso = event;
    this.node = event.node;
    this.nodeInsert.label = this.node.label;
    this.nodeInsert.data = this.node.data;
    this.selectHoraIni = { hora: this.node.data.hora_inicio };
    if (this.campoVacio(this.node.data.validar_diligencia)) {
      this.nodeInsert.data.validar_diligencia = false;
    }
    if (this.selectAbogado) {
      this.buscarAbogado(this.selectAbogado.cedula);
    } else {
      this.selectAbogado = this.listAbogado[0];
    }
    this.buscarCliente(this.selectCliente.cedula);
    this.selectEstado = this.node.data.estado;
    this.caso.node = this.node;
    event = this.caso;
    if (this.casoTreeInsert[0].data.id === event.node.data.id) {
      this.showDialogIngNodo = true;
    } else {
      this.showDialogIngNodoHijo = true;
    }

    // this.activaBotonGuardaNodoFlujo = true;
  }

  // Boton salir formulario inseert
  exitFormInsert() {
    this.showDialogIngNodo = false;
    this.showDialogIngNodoHijo = false;
  }
  // Eliminar un nodo insert
  deleteNodoInsert() {
    this.casoTreeInsert.forEach(nodes => {
      this.buscarQuitarNodo(nodes, this.node.data.id);
    });
    this.showDialogIngNodo = false;
    this.showDialogIngNodoHijo = false;
  }
  // Añadir un nodo.
  addNodoInsert() {
    this.selectNode = {
      label: 'Nueva Diligencia',
      data: {
        id: this.generarID(),
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        hora_inicio: this.selectHoraIni.hora,
        precio: 0,
        ingresar_actividad: false,
        validar_diligencia: false,
        modificar_actividad: false,
        descripcion_Administrador: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        abogado: this.selectAbogado,
        imagenes: [],
        estado: this.listEstado[0]
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.caso.node.expanded = true;
    this.showDialogIngNodo = false;
    this.showDialogIngNodoHijo = false;
  }
  // Modificar un nodo
  updateNodoInsert() {
    let fech = '';
    if (this.validarFecha()) {
      if (!this.campoVacio(this.fechaInicio) && !this.campoVacio(this.fechaFin) &&
        !this.campoVacio(this.nodeInsert.label) && !this.campoVacio(this.selectAbogado)) {
        if (this.casoTreeInsert[0].label === this.nodeInsert.label) {
          fech = this.fechaInicio;
        } else {
          fech = this.fechaFin;
        }
        const cli = {
          id: this.selectCliente._id,
          cedula: this.selectCliente.cedula,
          nombre: this.selectCliente.nombre,
          mail: this.selectCliente.mail
        };
        const abo = {
          id: this.selectAbogado._id,
          cedula: this.selectAbogado.cedula,
          nombre: this.selectAbogado.nombre,
          mail: this.selectAbogado.mail
        };
        this.node.label = this.nodeInsert.label;
        const newData = {
          id: this.node.data.id,
          fecha_inicio: this.fechaInicio,
          fecha_fin: fech,
          hora_inicio: this.selectHoraIni.hora,
          ingresar_actividad: this.nodeInsert.data.ingresar_actividad,
          validar_diligencia: this.nodeInsert.data.validar_diligencia,
          modificar_actividad: this.nodeInsert.data.ingresar_actividad,
          descripcion_Administrador: this.nodeInsert.data.descripcion_Administrador,
          descripcion_abogado: this.nodeInsert.data.descripcion_abogado,
          descripcion_cliente: this.nodeInsert.data.descripcion_cliente,
          cliente: cli,
          abogado: abo,
          estado: this.selectEstado,
          precio: this.nodeInsert.data.precio,
          imagenes: this.nodeInsert.data.imagenes,
        };

        this.node.data = newData;
        this.fechaInicio = '';
        this.fechaFin = '';
        this.showDialogIngNodo = false;
        this.showDialogIngNodoHijo = false;
      } else {
        this.notifyService.notify('error', 'ERROR', 'EXISTEN CAMPOS VACÍOS!');
      }
    }
  }
  // Anadir imagenes
  showFormImagenesInsert() {
    this.urlImagen1 = this.nodeInsert.data.imagenes[0];
    this.urlImagen2 = this.nodeInsert.data.imagenes[1];
    this.urlImagen3 = this.nodeInsert.data.imagenes[2];
    this.showDialogImagenes = true;
  }
  // Guardar imagenes
  saveImagenInsert() {
    this.nodeInsert.data.imagenes = [this.urlImagen1, this.urlImagen2, this.urlImagen3];
    this.exitImagenes();
  }
  //#endregion
  ///////////////////////////////////////////////////////////////////
  //#region Trabajo con el nodo add, uptade, delete, carga
  loadNode(event) {
    this.selectNode = {};
    this.selectNode = event.node;
  }

  // Añadir un nodo.
  addNodo() {
    this.selectNode = {
      label: 'Nueva Diligencia',
      data: {
        id: this.generarID(),
        fecha_inicio: new Date(),
        fecha_fin: new Date(),
        hora_inicio: this.selectHoraIni.hora,
        precio: 0,
        ingresar_actividad: false,
        validar_diligencia: false,
        modificar_actividad: false,
        descripcion_Administrador: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        abogado: this.selectAbogado,
        imagenes: [],
        estado: this.listEstado[0]
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.caso.node.expanded = true;
    this.showDialog = false;
    this.showDialogHijos = false;
  }

  // Modificar un nodo
  updateNodo() {
    let fech = '';
    if (this.casoTree[0].label === this.info.label) {
      fech = this.fechaInicio;
    } else {
      fech = this.fechaFin;
    }
    if (this.validarFecha()) {
      if (!this.campoVacio(this.fechaInicio) && !this.campoVacio(this.fechaFin) &&
        !this.campoVacio(this.info.label) && !this.campoVacio(this.selectAbogado)) {
        const cli = {
          id: this.selectCliente._id,
          cedula: this.selectCliente.cedula,
          nombre: this.selectCliente.nombre,
          mail: this.selectCliente.mail
        };
        const abo = {
          id: this.selectAbogado._id,
          cedula: this.selectAbogado.cedula,
          nombre: this.selectAbogado.nombre,
          mail: this.selectAbogado.mail
        };
        this.node.label = this.info.label;
        const newData = {
          id: this.info.data.id,
          fecha_inicio: this.fechaInicio,
          fecha_fin: fech,
          hora_inicio: this.selectHoraIni.hora,
          ingresar_actividad: this.info.data.ingresar_actividad,
          validar_diligencia: this.info.data.validar_diligencia,
          modificar_actividad: this.info.data.modificar_actividad,
          descripcion_Administrador: this.info.data.descripcion_Administrador,
          descripcion_abogado: this.info.data.descripcion_abogado,
          descripcion_cliente: this.info.data.descripcion_cliente,
          cliente: cli,
          abogado: abo,
          estado: this.selectEstado,
          precio: this.info.data.precio,
          imagenes: this.info.data.imagenes,
        };

        const act = {
          data: {
            id: this.info.data.id,
            fecha_inicio: this.fechaInicio,
            fecha_fin: fech,
            hora_inicio: this.selectHoraIni.hora,
            ingresar_actividad: this.info.data.ingresar_actividad,
            validar_diligencia: this.info.data.validar_diligencia,
            modificar_actividad: this.info.data.modificar_actividad,
            descripcion_Administrador: this.info.data.descripcion_Administrador,
            descripcion_abogado: this.info.data.descripcion_abogado,
            descripcion_cliente: this.info.data.descripcion_cliente,
            cliente: cli,
            abogado: abo,
            estado: this.selectEstado,
            precio: this.info.data.precio,
            imagenes: this.info.data.imagenes,
          },
          label: this.info.label,
        };
        this.node.data = newData;
        this.agregarActividadesIngresarModificar(act);
        this.fechaInicio = '';
        this.fechaFin = '';
        this.showDialog = false;
        this.showDialogHijos = false;
      } else {
        this.notifyService.notify('error', 'ERROR', 'EXISTEN CAMPOS VACÍOS!');
      }

    }
  }
  // anadir nodos a ingresar
  agregarActividadesIngresarModificar(newData) {
    let pos = this.buscarActividad();
    if (pos === -1)
      this.listActividadIngresar.push(newData);
    else {
      this.listActividadIngresar[pos] = newData;
    }
  }
  // Buscar si la actibidad ya existe y remplasar
  buscarActividad() {
    let pos = -1;
    for (let act of this.listActividadIngresar) {
      if (act.data.id === this.info.data.id) {
        pos++;
      };
    };
    return pos;
  };
  // Eliminar un nodo
  deleteNodo() {
    this.casoTree.forEach(nodes => {
      this.buscarQuitarNodo(nodes, this.node.data.id);
    });
    this.showDialog = false;
    this.showDialogHijos = false;
  }

  // Seleccionar un nodo.
  selectNodo(event) {
    this.fechaInicio = new Date(event.node.data.fecha_inicio);
    this.fechaFin = new Date(event.node.data.fecha_fin);
    this.caso = event;
    this.node = event.node;
    this.info.label = this.node.label;
    this.info.data = {
      id: this.node.data.id,
      fecha_inicio: this.node.data.fecha_inicio,
      fecha_fin: this.node.data.fecha_fin,
      hora_inicio: this.node.data.hora_inicio,
      precio: this.node.data.precio,
      ingresar_actividad: this.node.data.ingresar_actividad,
      validar_diligencia: this.node.data.validar_diligencia,
      modificar_actividad: this.node.data.modificar_actividad,
      descripcion_Administrador: this.node.data.descripcion_Administrador,
      descripcion_abogado: this.node.data.descripcion_abogado,
      descripcion_cliente: this.node.data.descripcion_cliente,
      cliente: this.node.data.cliente,
      abogado: this.node.data.abogado,
      imagenes: this.node.data.imagenes,
      estado: this.node.data.estado
    };
    this.selectHoraIni = { hora: this.node.data.hora_inicio };
    this.buscarAbogado(this.node.data.abogado.cedula);
    // this.buscarCliente(this.node.data.cliente.cedula);
    this.selectEstado = this.node.data.estado;
    this.caso.node = this.node;
    event = this.caso;
    if (this.casoTree[0].data.id === event.node.data.id) {
      this.showDialog = true;
    } else {
      this.showDialogHijos = true;
    }
  }
  //#endregion

  //#region modificar caso
  updateCaso() {
    this.blockBotones = this._serviceBotones.disabledBotonesCaso;
    this.recorrerUpdateActividadesIngresarModificar(this.casoTree[0]);
    const caso = {
      _id: this.idCaso,
      label: this.casoTree[0].label,
      data: this.casoTree[0].data,
      children: this.casoTree[0].children
    };
    this.numeroCaso = this.casoTree[0].label;
    this.casoService.updateCaso(caso).subscribe(data => {
      this.blockBotones = this._serviceBotones.blockBotones;
      this.recorrerAddUpdateActividades(this.listActividadIngresar);
      if (this.listActividadEliminar.length > 0)
        this.recorrerDeleteActividades(this.listActividadEliminar);
      let casoLog = {
        respuestaBDD: data,
        data: caso
      }
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'UPDATE-CASO',
        cambio_json: {
          mensaje: 'CAMBIOS GUARDADOS!',
          data: casoLog
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      this.inicio();
      this.ngOnInit();
      this.notifyService.notify('success', 'Exito', 'CAMBIOS GUARDADOS!');
    }, err => {
      this.blockBotones = this._serviceBotones.blockBotones;
      let casoLog = {
        respuestaBDD: err,
        data: caso
      }
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-UPDATE-CASO',
        cambio_json: {
          mensaje: 'ERROR AL GUARDAR!',
          data: casoLog
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
      this.notifyService.notify('error', 'ERROR', 'ERROR AL GUARDAR!');
    });
  }
  // guardar imágenes
  saveImagen() {
    this.info.data.imagenes = [this.urlImagen1, this.urlImagen2, this.urlImagen3];
    this.exitImagenes();
  }
  // muestra imagen seleccionada aumentada.
  showImgen(img) {
    this.showImagen = true;
    this.urlImagen = img;
  }
  // Cargar imagen
  cargaImagen(file: FileList, pos) {
    this.fileImagen = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (pos === 1) {
        this.urlImagen1 = event.target.result;
      } else if (pos === 2) {
        this.urlImagen2 = event.target.result;
      } else {
        this.urlImagen3 = event.target.result;
      }
    };
    reader.readAsDataURL(this.fileImagen);
  }
  //#endregion

  //#region Metodos generarID, recorrer arbol
  // Generar clave
  generarID() {
    const f = new Date();
    return (f.getTime().toString());
  }
  // Expande todo el arbol recursivamente
  expandAll() {
    this.casoTree.forEach(node => {
      this.expandRecursive(node, true);
    });
    this.blockBotones.contraer = false;
    this.blockBotones.expandir = true;
  }
  // Contrae todo el arbol de forma recursiva.
  collapseAll() {
    this.casoTree.forEach(node => {
      this.expandRecursive(node, false);
    });
    this.blockBotones.contraer = true;
    this.blockBotones.expandir = false;
  }
  // Expande todo el arbol recursivamente
  expandAllIng() {
    this.casoTreeInsert.forEach(node => {
      this.expandRecursive(node, true);
    });
    this.blockBotones.contraer = false;
    this.blockBotones.expandir = true;
  }
  // Contrae todo el arbol de forma recursiva.
  collapseAllIng() {
    this.casoTreeInsert.forEach(node => {
      this.expandRecursive(node, false);
    });
    this.blockBotones.contraer = true;
    this.blockBotones.expandir = false;
  }
  // Funsion que permite expandir de forma recursiva.
  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  // Funcion recursiva de remplazo de estado de nodo.
  private buscarRemplazarEstado(nodes: TreeNode, id: String) {
    if (nodes.data.id === id) {
      nodes.data.estado = this.selectEstado;
    } else {
      if (nodes.children) {
        nodes.children.forEach(childNode => {
          this.buscarRemplazarEstado(childNode, id);
        });
      }
    }
  }
  // Funcion recursiva de quitar un nodo.
  private buscarQuitarNodo(nodes: TreeNode, id: String) {
    // const newNode: TreeNode;
    if (nodes.children) {
      let i = 0;
      nodes.children.forEach(childNode => {
        if (childNode.data.id === id) {
          if (childNode.children.length === 0) {
            nodes.children.splice(i, 1);
            this.listActividadEliminar.push(childNode.data.id);
          } else {
            this.notifyService.notify('error', 'ERROR', 'No se puede eliminar, porque contine mas actividades dentro!');
          }
        } else {
          i++;
          this.buscarQuitarNodo(childNode, id);
        }
      });
    }
  }
  // Buscar un cliente en la lista
  public buscarCliente(ced: any) {
    for (const c of this.listCliente) {
      if (ced === c.cedula) {
        return c;
      }
    }
    /* this.listCliente.forEach(cli => {
      if (ced === cli.cedula) {
        return cli;
      }
    }); */
  }
  // Buscar un abogado en la lista
  public buscarAbogado(ced: any) {
    this.listAbogado.forEach(abo => {
      if (ced === abo.cedula) {
        this.selectAbogado = abo;
      }
    });
  }
  // Verificar caso recursivo.
  private verificarCasoRecursive(node: TreeNode) {
    this.banValidar = false;
    if (!this.campoVacio(node.data.abogado) && !this.campoVacio(node.data.fecha_inicio)) {
      if (node.children.length > 0) {
        node.children.forEach(childNode => {
          this.verificarCasoRecursive(childNode);
        });
      } else {
        this.banValidar = true;
      }
    }
  }
  // recorrer el nodo para guardar las actividades.
  recorrerUpdateActividades(nodoActividad: TreeNode) {
    const act = {
      label: nodoActividad.label,
      data: nodoActividad.data
    };
    if (nodoActividad.data.ingresar_actividad && nodoActividad.data.modificar_actividad)
      this.addActividad(act);
    if (nodoActividad.data.modificar_actividad)
      this.updateActividad(act);
    if (nodoActividad.children) {
      nodoActividad.children.forEach(childNode => {
        this.recorrerUpdateActividades(childNode);
      });
    }
  }
  // agregar actividades para ingreso o modificacion de la misma.
  recorrerUpdateActividadesIngresarModificar(nodoActividad: TreeNode) {
    if (!nodoActividad.data.modificar_actividad && nodoActividad.data.ingresar_actividad)
      nodoActividad.data.modificar_actividad = true;
    if (nodoActividad.children.length > 0) {
      nodoActividad.children.forEach(childNode => {
        this.recorrerUpdateActividadesIngresarModificar(childNode);
      });
    }
  }
  // Modificar actividad en la agenda.
  updateActividad(datosCalendario) {
    const actividad = {
      'id_actividad_caso': datosCalendario.data.id,
      'caso_numero': this.numeroCaso,
      'actividad': datosCalendario.label,
      'fecha_inicio': new Date(datosCalendario.data.fecha_inicio),
      'fecha_fin': new Date(datosCalendario.data.fecha_fin),
      'prioridad': 'yellow',
      'abogado': datosCalendario.data.abogado.id,
      'hora_inicio': datosCalendario.data.hora_inicio,
      'hora_fin': '18:00',
      'repetir': 'Nunca',
      'recordatorio': '1 hora antes',
      'estado': 'Activo'
    };
    this.actividadAgenda.updateActividadExtraIdCaso(actividad).subscribe(data => {
      // this.numeroCaso = '';
      let act = {
        respuestaBDD: data,
        data: actividad
      };
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'UPDATE-ACTIVIDAD',
        cambio_json: {
          mensaje: 'Modificación existosa!',
          data: act
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
    }, err => {
      // this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
      let act = {
        respuestaBDD: err,
        data: actividad
      };
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-UPDATE-ACTIVIDAD',
        cambio_json: {
          mensaje: 'ERROR AL MODIFICAR ACTIVIDAD!',
          data: act
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
    });

  }
  // Borrado logico de las actividades
  recorrerDeleteActividades(listActividades) {
    for (let a of listActividades) {
      this.deleteActividad(a);
    }
  }
  // Borrado logico de las actividades
  recorrerAddUpdateActividades(listActividadIngresar) {
    for (let a of listActividadIngresar) {
      if (!a.data.modificar_actividad && a.data.ingresar_actividad)
        this.addActividad(a);
      if (a.data.modificar_actividad)
        this.updateActividad(a);
    }
  }
  // Modificar actividad en la agenda.
  deleteActividad(idNodoCaso) {
    const actividad = {
      'id_actividad_caso': idNodoCaso,
      'prioridad': 'gray',
      'estado': 'Eliminado'
    };
    this.actividadAgenda.updateActividadExtraIdCaso(actividad).subscribe(data => {
      // this.numeroCaso = '';
      let act = {
        respuestaBDD: data,
        data: actividad
      };
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'DELETE-ACTIVIDAD',
        cambio_json: {
          mensaje: 'DELETE existosa!',
          data: act
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
    }, err => {
      // this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
      let act = {
        respuestaBDD: err,
        data: actividad
      };
      const log = {
        usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
        cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
        fecha: new Date(),
        transaccion: 'ERROR-DELETE-ACTIVIDAD',
        cambio_json: {
          mensaje: 'ERROR AL DELETE ACTIVIDAD!',
          data: act
        }
      }
      this._serviceLogCambios.addLogCambio(log).subscribe();
    });

  }
  //#endregion

  //#region Funciones de habilitar y desabilitar botones.
  // valida campos nulos vacios undefined
  campoVacio(campo) {
    if (campo === undefined || campo === '' || campo === null) {
      return true;
    } else {
      return false;
    }
  }
  // envio de mail administrador.
  enviarMail() {
    if (this.validarMails(this.datosMail.para) && !this.campoVacio(this.datosMail.asunto) && !this.campoVacio(this.datosMail.body)) {
      this.blockBotones.enviarMail = true;
      const mail = {
        destinatario: this.datosMail.para,
        asunto: this.datosMail.asunto,
        texto: 'Administrador', //this.datosMail.body,
        html: this.datosMail.body
      };
      this.sendEmailService.sendNotifications(mail).subscribe(data => {
        if (data) {
          this.blockBotones.enviarMail = false;
          let mailLog = {
            respuestaBDD: data,
            data: mail
          };
          const log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ENVIO-MAIL',
            cambio_json: {
              mensaje: 'CORREO ENVIADO!',
              data: mailLog
            }
          };
          this._serviceLogCambios.addLogMail(log).subscribe();
          this.notifyService.notify('success', 'Exito', 'CORREO ENVIADO!');
          this.exitMail();
        } else {
          this.blockBotones.enviarMail = false;
          let mailLog = {
            respuestaBDD: data,
            data: mail
          }
          const log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ENVIO-MAIL',
            cambio_json: {
              mensaje: 'NO SE PUEDO ENVIAR EL CORREO!',
              data: mailLog
            }
          }
          this._serviceLogCambios.addLogMail(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'NO SE PUEDO ENVIAR EL CORREO!');
        }
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotones;
        let mailLog = {
          respuestaBDD: err,
          data: mail
        }
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'ERROR-ENVIO-MAIL',
          cambio_json: {
            mensaje: 'NO SE PUEDO ENVIAR EL CORREO!',
            data: mailLog
          }
        }
        this._serviceLogCambios.addLogMail(log).subscribe();
        this.notifyService.notify('error', 'ERROR', 'NO SE PUEDO ENVIAR EL CORREO!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'REVICE LOS CAMPOS!');
    }
  };
  // nenvio de mail cliente
  enviarMailCliente() {
    if (!this.campoVacio(this.bodyCliente)) {
      this.blockBotones.enviarMail = true;
      const mail = {
        destinatario: JSON.parse(localStorage.getItem('userLogin')).mail + ';' + 'angellrio2018@gmail.com',
        asunto: 'Cliente Caso # ' + this.casoTree[0].label + ' ' + this.cliente.nombre,
        texto: 'Cliente',
        html: this.bodyCliente
      };
      this.sendEmailService.sendNotifications(mail).subscribe(data => {
        if (data) {
          this.blockBotones.enviarMail = false;
          let mailLog = {
            respuestaBDD: data,
            data: mail
          };
          const log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ENVIO-MAIL',
            cambio_json: {
              mensaje: 'CORREO ENVIADO!',
              data: mailLog
            }
          };
          this._serviceLogCambios.addLogMail(log).subscribe();
          this.notifyService.notify('success', 'Exito', 'CORREO ENVIADO!');
          this.exitMailCliente();
        } else {
          this.blockBotones.enviarMail = false;
          let mailLog = {
            respuestaBDD: data,
            data: mail
          }
          const log = {
            usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
            cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
            fecha: new Date(),
            transaccion: 'ERROR-ENVIO-MAIL',
            cambio_json: {
              mensaje: 'NO SE PUEDO ENVIAR EL CORREO!',
              data: mailLog
            }
          }
          this._serviceLogCambios.addLogMail(log).subscribe();
          this.notifyService.notify('error', 'ERROR', 'NO SE PUEDO ENVIAR EL CORREO!');
        }
      }, err => {
        this.blockBotones = this._serviceBotones.blockBotones;
        let mailLog = {
          respuestaBDD: err,
          data: mail
        }
        const log = {
          usuario: JSON.parse(localStorage.getItem('userLogin')).user_name,
          cedula: JSON.parse(localStorage.getItem('userLogin')).cedula,
          fecha: new Date(),
          transaccion: 'ERROR-ENVIO-MAIL',
          cambio_json: {
            mensaje: 'NO SE PUEDO ENVIAR EL CORREO!',
            data: mailLog
          }
        }
        this._serviceLogCambios.addLogMail(log).subscribe();
        this.notifyService.notify('error', 'ERROR', 'NO SE PUEDO ENVIAR EL CORREO!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'REVICE LOS CAMPOS!');
    }
  };
  // validar grupo de mails.
  validarMails(mails) {
    let resp: boolean = true;
    if (mails.length > 0) {
      let listMails = mails.split(';');
      for (let mail of listMails) {
        if (!this.validarService.validateEmail(mail)) {
          resp = false;
          break;
        }
      };
      return (resp);
    } else
      return false;
  };
  // salir del formulario del administrador
  exitMail() {
    this.datosMail = {
      para: [],
      asunto: '',
      body: '',
    };
    this.showDialogMail = false;
  };
  // saludo del formulario de mail cliente
  exitMailCliente() {
    this.bodyCliente = '';
    this.showDialogMailCliente = false;
  };
  // mostrar formulario de mail administrador.
  mostrarDialogMail() {
    this.showDialogMail = true;
    this.datosMail.para = this.cliente.mail;
  }
  // mostrar formulario de envio de mail cliente.
  mostrarDialogMailCliente() {
    this.showDialogMailCliente = true;
  }
  // mostrar formulario de imagenes.
  showFormImagenes() {
    this.urlImagen1 = this.info.data.imagenes[0];
    this.urlImagen2 = this.info.data.imagenes[1];
    this.urlImagen3 = this.info.data.imagenes[2];
    this.showDialogImagenes = true;
  }

  //salir del formulario de imagenes.
  exitShowImage() {
    this.showImagen = false;
  }
  //#endregion

  //#region botones salir de los formularios
  // Boton salir de imágenes.
  exitImagenes() {
    this.urlImagen = '';
    this.urlImagen1 = 'assets/papel.png';
    this.urlImagen2 = 'assets/papel.png';
    this.urlImagen3 = 'assets/papel.png';
    this.showDialogImagenes = false;
  }
  // Boton salir arbol
  exitArbol() {
    this.inicio();
  }
  // Boton salir formulario
  exitForm() {
    this.showDialog = false;
    this.showDialogHijos = false;
  }
  //validar fecha
  validarFecha() {
    if (this.fechaInicio > this.fechaFin) {
      this.notifyService.notify('error', 'ERROR', 'Rango de fechas INCORRECTO!');
      return false;
    } else {
      return true;
    }
  }
  // Paginado de la tabla
  validarPaginado() {
    if (this.paginado < 3) {
      this.paginado = 10;
      this.notifyService.notify('error', 'ERROR', 'Paginado mínimo 3.');
    }
    if (this.paginado > 25) {
      this.paginado = 25;
      this.notifyService.notify('error', 'ERROR', 'Paginado máximo 25.');
    }
  };
  //#endregion
}
