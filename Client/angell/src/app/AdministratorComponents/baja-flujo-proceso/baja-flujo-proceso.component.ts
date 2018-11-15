import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FlujoProcesoService } from '../../Services/flujo-proceso/flujo-proceso.service';
import { TreeNode } from 'primeng/api';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-baja-flujo-proceso',
  templateUrl: './baja-flujo-proceso.component.html',
  styleUrls: ['./baja-flujo-proceso.component.css']
})
export class BajaFlujoProcesoComponent implements OnInit {

  //#region Variables e inicios
  listFlujo: any = [];
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

  constructor(
    private flujoProcesoService: FlujoProcesoService,
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    public notifyService: NotificacionesService
  ) {
    this.inicio();
  }

  inicio() {
    this.info = {
      label: '',
      data: {
        id: '',
        fecha_inicio: Date,
        fecha_fin: Date,
        cliente: Object,
        abogado: Object,
        descripcion_abogado: '',
        descripcion_cliente: '',
        estado: this.listEstado[0]
      }
    };
    this.infoNodo = {
      label: '',
      data: {
        id: '',
        fecha_inicio: Date,
        fecha_fin: Date,
        abogado: Object,
        descripcion_abogado: '',
        descripcion_cliente: '',
        estado: this.listEstado[0]
      }
    };

    this.listFlujo = [];
    this.listAbogado = [];
    this.listCliente = [];
    this.flujoProcesoService.allFlujoProceso().subscribe(data => {
      this.listFlujo = data;
    });
    this.clienteService.getClienteTipo().subscribe(data => {
      this.listCliente = data;
      this.selectCliente = this.listCliente[0];
    });
    this.abogadoService.getAbogadoTipo().subscribe(data => {
      this.listAbogado = data;
      this.selectAbogado = this.listAbogado[0];
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
        fecha_inicio: Date,
        fecha_fin: Date,
        descripcion: '',
        cliente: Object,
        abogado: Object,
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
        label: 'Número caso',
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
    this.casoTree = [];
    this.showDialogMod = true;
    this.casoTree = [event.data];
    this.expandAll();
    this.banClose = false;
    this.banOpen = true;
  }

  showDialogAdd() {
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
        estado: this.listEstado[0]
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.showDialog = false;
    this.showDialogHijos = false;
  }

  updateNodo() {
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
      id: this.node.data.id,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      descripcion_abogado: this.info.data.descripcion_abogado,
      descripcion_cliente: this.info.data.descripcion_cliente,
      cliente: cli,
      abogado: abo,
      estado: this.selectEstado
    };
    this.node.data = newData;
    this.fechaInicio = '';
    this.fechaFin = '';
    this.showDialog = false;
    this.showDialogHijos = false;
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
    this.selectEstado = this.node.data.estado;
    this.selectCliente = this.node.data.cliente;
    this.selectAbogado = this.node.data.abogado;
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
  }

  updateNodoIng() {
    this.node.label = this.nodeNew.label;
    this.node.data = this.nodeNew.data;
    this.showDialogIngNodo = false;
  }

  deleteNodoIng() {
    this.casoTreeNew.forEach(nodes => {
      this.buscarQuitarNodo(nodes, this.node.data.id);
    });
    this.showDialogIngNodo = false;
  }

  selectNodoIng(event) {
    this.caso = event;
    this.node = event.node;
    this.nodeNew.label = this.node.label;
    this.nodeNew.data = this.node.data;
    this.showDialogIngNodo = true;
  }
  //#endregion

  //#region Guardar Diagrama
  saveCaso() {
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
  }
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
  //#endregion

  //#region Funciones de habilitar y desabilitar botones.
  //#endregion
}
