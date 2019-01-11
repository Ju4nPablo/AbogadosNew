import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FlujoProcesoService } from '../../Services/flujo-proceso/flujo-proceso.service';
import { TreeNode } from 'primeng/api';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { SendEmailService } from '../../Services/send-email/send-email.service';
import { ActividadExtraService } from '../../Services/actividad-extra/actividad-extra.service';

@Component({
  selector: 'app-baja-flujo-proceso',
  templateUrl: './baja-flujo-proceso.component.html',
  styleUrls: ['./baja-flujo-proceso.component.css']
})
export class BajaFlujoProcesoComponent implements OnInit {

  //#region Variables e inicios
  fileImagen: File = null;
  urlImagen1: any = 'assets/papel.png';
  urlImagen2: any = 'assets/papel.png';
  urlImagen3: any = 'assets/papel.png';
  urlImagen: any = '';
  filesImagens: any = [];
  showDialogImagenes: Boolean = false;
  showImagen: Boolean = false;
  listFlujo: any = [];
  listTabla: any = [];
  listCliente: any = [];
  listAbogado: any = [];
  cols: any[];
  es: any;
  casoTree: TreeNode[];
  casoTreeNew: TreeNode[];
  showDialogMod: Boolean = false;
  selectProceso: any = {};
  // Variables nuevas
  msgs: any = [];
  selectNode: TreeNode;
  node: any;
  nodeNew: any;
  showDialog: Boolean = false;
  showDialogHijos: Boolean = false;
  showDialogIng: Boolean = false;
  showDialogIngNodo: Boolean = false;
  caso: any = {};
  selectEstado: any = {};
  selectCliente: any = {};
  selectAbogado: any = {};
  listEstado: any = [];
  banClose: Boolean = true;
  banOpen: Boolean = false;
  info: any = '';
  infoNodo: any = '';
  numCaso: any = '';
  fechaInicio: any = '';
  fechaFin: any = '';
  activaBotonGuardarNodo: any = '';
  activaBotonGuardarFlujo: any = '';
  activaBotonGuardaNodoFlujo: any = '';
  banValidar: any = '';

  constructor(
    private flujoProcesoService: FlujoProcesoService,
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService,
    private sendEmailService: SendEmailService,
    private agenda: ActividadExtraService
  ) {
    this.inicio();
  }

  inicio() {
    this.info = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        cliente: Object,
        abogado: Object,
        descripcion_abogado: '',
        descripcion_cliente: '',
        precio: 0,
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
        abogado: Object,
        descripcion_abogado: '',
        descripcion_cliente: '',
        estado: this.listEstado[0]
      }
    };

    this.listFlujo = [];
    this.listAbogado = [];
    this.listCliente = [];
    this.listTabla = [];
    this.filesImagens = [];
    this.urlImagen1 = 'assets/papel.png';
    this.urlImagen2 = 'assets/papel.png';
    this.urlImagen3 = 'assets/papel.png';
    this.urlImagen = '';
    this.showDialogImagenes = false;
    this.showImagen = false;
    this.flujoProcesoService.allFlujoProceso().subscribe(data => {
      this.listFlujo = data;
      this.listFlujo.forEach(item => {
        this.listTabla.push({
          id: item._id,
          label: item.label,
          descripcion: item.data.descripcion
        });
      });
    });
    this.clienteService.getClienteTipo().subscribe(data => {
      this.listCliente = data;
      this.listCliente.unshift({
        _id: '-1',
        nombre: 'Seleccione cliente'
      });
    });
    this.abogadoService.getAbogadoTipo().subscribe(data => {
      this.listAbogado = data;
      this.listAbogado.unshift({
        _id: '-1',
        nombre: 'Seleccione abogado'
      });
    });
    this.cols = [
      { field: 'label', header: 'Nombre flujo' },
      { field: 'descripcion', header: 'Descripción del evento' },
    ];
    this.showDialogMod = false;
    this.selectProceso = {};
    // Agregados
    this.listEstado = [
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
      }];
    this.node = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        descripcion: '',
        precio: 0,
        cliente: '',
        abogado: '',
        estado: this.listEstado[0]
      }
    };
    this.nodeNew = {
      label: '',
      data: {
        id: '',
        descripcion: '',
        estado: ''
      }
    };
    this.selectEstado = this.listEstado[0];
    this.showDialog = false;
    this.showDialogHijos = false;
    this.showDialogIng = false;
    this.showDialogIngNodo = false;
    this.caso = {};
    this.banClose = true;
    this.banOpen = false;
    this.activaBotonGuardarNodo = false;
    this.activaBotonGuardarFlujo = true;
    this.activaBotonGuardaNodoFlujo = true;
    this.banValidar = false;
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

    this.casoTreeNew = [
      {
        label: 'Nombre del flujo',
        data: {
          id: this.generarID(),
          descripcion: '',
          estado: this.listEstado[0]
        },
        children: []
      }
    ];
  }
  //#endregion

  selectItem(event) {
    this.listFlujo.forEach(item => {
      if (item._id === event.data.id) {
        this.casoTree = [];
        this.showDialogMod = true;
        this.casoTree = [item];
        this.expandAll();
        this.banClose = false;
        this.banOpen = true;
      }
    });
  }

  showDialogAdd() {
    this.casoTreeNew = [
      {
        label: 'Nombre del flujo',
        data: {
          id: this.generarID(),
          descripcion: '',
          estado: this.listEstado[0]
        },
        children: []
      }
    ];
    this.showDialogIng = true;
  }

  //#region Trabajo con el nodo Modificar add, uptade, delete, carga
  loadNode(event) {
    this.selectNode = {};
    this.selectNode = event.node;
    this.banClose = false;
    this.banOpen = false;
  }

  addNodo() {
    this.selectNode = {
      label: 'Nodo New',
      data: {
        id: this.generarID(),
        fecha_inicio: '',
        fecha_fin: '',
        abogado: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
        estado: this.listEstado[0]
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.showDialog = false;
    this.showDialogHijos = false;
  }
  // modifica los datos del nodo seleccionado
  updateNodo() {
    if (!this.campoVacio(this.fechaInicio) && !this.campoVacio(this.info.label) && this.selectAbogado._id !== '-1') {
      let newData = {};
      const abo = {
        id: this.selectAbogado._id,
        cedula: this.selectAbogado.cedula,
        nombre: this.selectAbogado.nombre,
        mail: this.selectAbogado.mail
      };
      this.node.label = this.info.label;
      if (this.casoTree[0].data.id === this.info.data.id) {
        if (this.selectCliente._id !== '-1') {
          this.fechaFin = this.fechaInicio;
          const cli = {
            id: this.selectCliente._id,
            cedula: this.selectCliente.cedula,
            nombre: this.selectCliente.nombre,
            mail: this.selectCliente.mail
          };
          newData = {
            id: this.node.data.id,
            fecha_inicio: this.fechaInicio,
            fecha_fin: this.fechaFin,
            descripcion_abogado: this.info.data.descripcion_abogado,
            descripcion_cliente: this.info.data.descripcion_cliente,
            precio: this.info.data.precio,
            cliente: cli,
            abogado: abo,
            estado: this.selectEstado,
            imagenes: this.info.data.imagenes,
          };
          this.node.data = newData;
          this.fechaInicio = '';
          this.fechaFin = '';
          this.showDialog = false;
          this.showDialogHijos = false;
        } else {
          this.notifyService.notify('error', 'ERROR', 'SELECCIONE UN CLIENTE!');
        }
      } else {
        newData = {
          id: this.node.data.id,
          fecha_inicio: this.fechaInicio,
          fecha_fin: this.fechaFin,
          descripcion_abogado: this.info.data.descripcion_abogado,
          descripcion_cliente: this.info.data.descripcion_cliente,
          abogado: abo,
          estado: this.selectEstado,
          precio: this.info.data.precio,
          imagenes: this.info.data.imagenes,
        };
        this.node.data = newData;
        this.fechaInicio = '';
        this.fechaFin = '';
        this.showDialog = false;
        this.showDialogHijos = false;
      }
    } else {
      this.notifyService.notify('error', 'ERROR', 'EXISTEN CAMPOS VACÍOS!');
    }
  }

  deleteNodo() {
    this.casoTree.forEach(nodes => {
      this.buscarQuitarNodo(nodes, this.node.data.id);
    });
    this.showDialog = false;
    this.showDialogHijos = false;
  }

  selectNodo(event) {
    this.caso = event;
    this.node = event.node;
    this.info.label = this.node.label;
    this.info.data = this.node.data;
    if (this.campoVacio(this.info.data.imagenes)) {
      this.info.data.imagenes = ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'];
    }
    this.selectEstado = this.node.data.estado;
    if (!this.campoVacio(this.node.data.fecha_inicio)) {
      this.fechaInicio = this.node.data.fecha_inicio;
    }
    if (!this.campoVacio(this.node.data.fecha_fin)) {
      this.fechaFin = this.node.data.fecha_fin;
    }
    if (!this.campoVacio(this.node.data.abogado)) {
      this.buscarAbogado(this.node.data.abogado.cedula);
    } else {
      this.selectAbogado = this.listAbogado[0];
    }
    if (!this.campoVacio(this.node.data.cliente)) {
      this.buscarCliente(this.node.data.cliente.cedula);
    } else {
      this.selectCliente = this.listCliente[0];
    }
    if (!this.campoVacio(this.node.data.precio)) {
      this.info.data.precio = this.node.data.precio;
    } else {
      this.info.data.precio = 0;
    }
    if (this.casoTree[0].data.id === event.node.data.id) {
      this.showDialog = true;
    } else {
      this.showDialogHijos = true;
    }
  }
  //#endregion

  //#region Trabajo con el nodo Ingresar add, uptade, delete, carga
  loadNodeIng(event) {
    this.selectNode = {};
    this.selectNode = event.node;
  }

  addNodoIng() {
    this.selectNode = {
      label: 'Nodo New',
      data: {
        id: this.generarID(),
        descripcion: '',
        estado: this.selectEstado
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.showDialogIngNodo = false;
    this.activaBotonGuardarFlujo = false;
  }

  updateNodoIng() {
    this.node.label = this.nodeNew.label;
    this.node.data = this.nodeNew.data;
    this.showDialogIngNodo = false;
  }

  deleteNodoIng() {
    this.casoTreeNew.forEach(nodes => {
      this.buscarQuitarNodo(nodes, this.node.data.id);
      if (nodes.children.length > 0) {
        this.activaBotonGuardarFlujo = false;
      } else {
        this.activaBotonGuardarFlujo = true;
      }
    });
    this.showDialogIngNodo = false;
  }

  selectNodoIng(event) {
    this.caso = event;
    this.node = event.node;
    this.nodeNew.label = this.node.label;
    this.nodeNew.data = this.node.data;
    this.showDialogIngNodo = true;
    this.activaBotonGuardaNodoFlujo = true;
  }
  //#endregion

  //#region Guardar Diagrama
  saveCaso() {
    this.verificarCasoRecursive(this.casoTree[0]);
    if (this.banValidar) {
      this.recorrerAddActividades(this.casoTree[0]);
      const casoSave = {
        label: this.casoTree[0].label,
        data: this.casoTree[0].data,
        children: this.casoTree[0].children
      };
      this.casoService.addCaso(casoSave).subscribe(data => {
        this.inicio();
        this.ngOnInit();
        this.notifyService.notify('success', 'Exito', 'INGRESO EXITOSO!');
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'ERROR AL INGRESAR!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'EXISTEN CAMPOS VACÍOS!');
    }
  }

  // recorrer el nodo para guardar las actividades.
  recorrerAddActividades(nodoActividad: TreeNode) {
    const act = {
      label: nodoActividad.label,
      data: nodoActividad.data
    };
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
      'actividad': datosCalendario.label,
      'fecha_inicio': datosCalendario.data.fecha_inicio,
      'fecha_fin': datosCalendario.fecha_fin,
      'prioridad': 'yellow',
      'encargado': datosCalendario.data.abogado.id,
      'hora_inicio': '8:00',
      'hora_fin': '16:00',
      'repetir': 'Nunca',
      'recordatorio': '1 hora antes'
    };
    this.agenda.addActividadExtra(actividad).subscribe(data => {
      console.log(data);
    }, err => {
      // this.notifyService.notify('error', 'ERROR', 'Error Conexión!');
    });
  }

  // guardar flujo
  saveFlujo() {
    const flujo = {
      label: this.casoTreeNew[0].label,
      data: this.casoTreeNew[0].data,
      children: this.casoTreeNew[0].children
    };
    this.flujoProcesoService.addFlujoProceso(flujo).subscribe(data => {
      this.inicio();
      this.ngOnInit();
      this.notifyService.notify('success', 'Exito', 'Ingreso existoso!');
    }, err => {
      this.notifyService.notify('error', 'ERROR', 'ERROR AL INGRESAR!');
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
    return (f.getTime());
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
  // Salir de form de ingreso un nodo
  exit() {
    this.showDialogIngNodo = false;
  }
  // Expande todo el arbol recursivamente
  expandAll() {
    this.casoTree.forEach(node => {
      this.expandRecursive(node, true);
    });
    this.banClose = false;
    this.banOpen = true;
  }
  // Contrae todo el arbol de forma recursiva.
  collapseAll() {
    this.casoTree.forEach(node => {
      this.expandRecursive(node, false);
    });
    this.banClose = true;
    this.banOpen = false;
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
  private buscarRemplazarEstado(nodes: TreeNode, info: any) {
    if (nodes.data.id === info.id) {
      nodes.data = info;
    } else {
      if (nodes.children) {
        nodes.children.forEach(childNode => {
          this.buscarRemplazarEstado(childNode, info);
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
          nodes.children.splice(i, 1);
        } else {
          i++;
          this.buscarQuitarNodo(childNode, id);
        }
      });
    }
  }
  // Modificar todo el nodo recursivo aun no verificado.
  private UpdateRecursive(node: TreeNode, datos: Object) {
    node.data = datos;
    if (node.children) {
      node.children.forEach(childNode => {
        this.UpdateRecursive(childNode, datos);
      });
    }
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
  // Buscar un abogado en la lista
  public buscarAbogado(ced: any) {
    this.listAbogado.forEach(abo => {
      if (ced === abo.cedula) {
        this.selectAbogado = abo;
      }
    });
  }
  // Buscar un cliente en la lista
  private buscarCliente(ced: any) {
    this.listCliente.forEach(cli => {
      if (ced === cli.cedula) {
        this.selectCliente = cli;
      }
    });
  }
  //#endregion

  //#region Funciones de habilitar y desabilitar botones.
  validarCampos() {

  }
  // valida campos nulos vacios undefined
  campoVacio(campo) {
    if (campo === undefined || campo === '' || campo === null || campo === 0) {
      return true;
    } else {
      return false;
    }
  }
  limpiarCampos() {
    this.fechaInicio = '';
    this.fechaFin = '';
  }
  // verifica si el campo etiqueta es nulo y lo pinta.
  verificaEtiqueta() {
    if (!this.campoVacio(this.nodeNew.label)) {
      if (!this.validarService.validateDireccion(this.nodeNew.label)) {
        document.getElementById('etiqueta').style.borderColor = '#FE2E2E'; // rojo
        this.activaBotonGuardaNodoFlujo = true;
      } else {
        document.getElementById('etiqueta').style.borderColor = '#5ff442'; // green
        this.activaBotonGuardaNodoFlujo = false;
      }
    }
  }
  enviarMail() {
    const mailCliente = {
      destinatario: this.selectCliente.mail,
      texto: 'Estimado cliente esto es un mail de prueba.'
    };
    this.sendEmailService.sendNotifications(mailCliente).subscribe(data => {
      if (data) {
        this.notifyService.notify('success', 'Exito', 'CORREO ENVIADO!');
      } else {
        this.notifyService.notify('error', 'ERROR', 'NO SE PUEDO ENVIAR EL CORREO!');
      }

    });
  }
  showFormImagenes() {
    this.urlImagen1 = this.info.data.imagenes[0];
    this.urlImagen2 = this.info.data.imagenes[1];
    this.urlImagen3 = this.info.data.imagenes[2];
    this.showDialogImagenes = true;
  }
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
  //#endregion
  //#region Funciones de habilitar y desabilitar botones.

  //#endregion
}
