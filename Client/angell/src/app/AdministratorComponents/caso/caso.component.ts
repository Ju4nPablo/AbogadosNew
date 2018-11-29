import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { SendEmailService } from '../../Services/send-email/send-email.service';
import { DataTable } from 'primeng/datatable';
@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.css']
})
export class CasoComponent implements OnInit {

  //#region Variables e inicios

  listCaso: any = [];
  listTabla: any = [];
  listCliente: any = [];
  listAbogado: any = [];
  cols: any[];
  es: any;
  casoTree: TreeNode[];
  showDialogMod: Boolean = false;
  selectProceso: any = {};
  // selectNode: any = {};
  // Variables nuevas
  msgs: any = [];
  selectNode: TreeNode;
  node: any;
  showDialog: Boolean = false;
  showDialogHijos: Boolean = false;
  caso: any = {};
  selectEstado: any = {};
  selectCliente: any = {};
  selectAbogado: any = {};
  listEstado: any = [];
  banClose: Boolean = true;
  banOpen: Boolean = false;
  idCaso: any = '';

  numCaso: any = '';
  fechaInicio: any = '';
  fechaFin: any = '';
  info: any = '';
  infoNodo: any = '';
  cliente: any = '';
  blockCampos: any = {
    blockFechIni: false,
    blockFechFin: false,
    blockCaso: false,
    blockCliente: true,
    blockAbogado: false,
    blockDescripcionAbogado: false,
    blockDescripcionCliente: false,
    blockEstado: false,
  };
  showButon: any = {
    showAnadir: true,
    showQuitar: true
  };

  constructor(
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    private notifyService: NotificacionesService,
    private sendEmailService: SendEmailService
  ) {
    this.inicio();
  }

  inicio() {
    const us = JSON.parse(localStorage.getItem('userLogin'));
    this.listCaso = [];
    this.listAbogado = [];
    this.listCliente = [];
    this.listTabla = [];
    this.clienteService.getClienteTipo().subscribe(data => {
      this.listCliente = data;
      this.selectCliente = this.listCliente[0];
    });
    this.abogadoService.getAbogadoTipo().subscribe(data => {
      this.listAbogado = data;
      this.selectAbogado = this.listAbogado[0];
    });
    if (us.tipo === '1') {
      this.casoService.allCasoPendientes().subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
      });
      this.blockCampos = {
        blockFechIni: false,
        blockFechFin: false,
        blockCaso: false,
        blockCliente: true,
        blockAbogado: false,
        blockDescripcionAbogado: false,
        blockDescripcionCliente: false,
        blockEstado: false,
      };
      this.showButon = {
        showAnadir: true,
        showQuitar: true
      };
    }
    if (us.tipo === '2') {
      const obj = {
        cedula: us.cedula
      };
      this.casoService.AllCasoClientePendiente(obj).subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
      });
      this.blockCampos = {
        blockFechIni: true,
        blockFechFin: true,
        blockCaso: true,
        blockCliente: true,
        blockAbogado: true,
        blockDescripcionAbogado: true,
        blockDescripcionCliente: false,
        blockEstado: true,
      };
      this.showButon = {
        showAnadir: false,
        showQuitar: false
      };
    }
    if (us.tipo === '3') {
      const obj = {
        cedula: us.cedula
      };
      this.casoService.AllCasoAbogadoPendiente(obj).subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
      });
      this.blockCampos = {
        blockFechIni: true,
        blockFechFin: true,
        blockCaso: true,
        blockCliente: true,
        blockAbogado: true,
        blockDescripcionAbogado: false,
        blockDescripcionCliente: true,
        blockEstado: true,
      };
      this.showButon = {
        showAnadir: false,
        showQuitar: false
      };
    }
    this.cols = [
      { field: 'label', header: 'Número caso' },
      { field: 'abogado', header: 'Abogado' },
      { field: 'cliente', header: 'Cliente' },
    ];
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
        codigo: '',
        descripcion: '',
        cliente: '',
        abogado: '',
        fecha: '',
        estado: this.listEstado[0]
      }
    };
    this.selectEstado = this.listEstado[0];
    this.showDialog = false;
    this.showDialogHijos = false;
    this.showDialogMod = false;
    this.caso = {};
    this.banClose = true;
    this.banOpen = false;
    this.idCaso = '';
    this.info = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        cliente: '',
        abogado: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        estado: this.listEstado[0]
      }
    };
    this.infoNodo = {
      label: '',
      data: {
        id: '',
        fecha_inicio: '',
        fecha_fin: '',
        abogado: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        estado: this.listEstado[0]
      }
    };
    this.cliente = '';
  }

  cargarTabla(lista) {
    lista.forEach(item => {
      this.listTabla.push({
        id: item._id,
        label: item.label,
        cliente: item.data.cliente.nombre,
        abogado: item.data.abogado.nombre
      });
    });
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
    this.sendEmailService.sendNotifications({ "destinatario": "mrjleo1989@gmail.com", "texto": "example text" }).subscribe(data => {
      console.log(data);
      //devuelve true si se envio el mail, caso contrario false
    })
  }
  //#endregion

  selectItem(event) {
    this.listCaso.forEach(item => {
      if (item._id === event.data.id) {
        this.showDialogMod = true;
        this.idCaso = item._id;
        this.cliente = item.data.cliente.nombre;
        this.casoTree = [item];
        this.expandAll();
        this.banClose = false;
        this.banOpen = true;
      }
    });
  }

  //#region Trabajo con el nodo add, uptade, delete, carga
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
        fecha_inicio: new Date,
        fecha_fin: new Date,
        abogado: Object,
        descripcion_abogado: '',
        estado: this.listEstado[0]
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.showDialog = false;
    this.showDialogHijos = false;
  }

  updateNodo() {
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
    this.fechaInicio = new Date(event.node.data.fecha_inicio);
    this.fechaFin = new Date(event.node.data.fecha_fin);
    this.caso = event;
    this.node = event.node;
    this.info.label = this.node.label;
    this.info.data = this.node.data;
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

  //#region Guardar Diagrama
  saveCaso() {
    const caso = {
      label: this.casoTree[0].label,
      data: this.casoTree[0].data,
      children: this.casoTree[0].children
    };
    this.casoService.addCaso(caso).subscribe(data => {
      this.inicio();
    });
  }
  updateCaso() {
    // if (this.verificarCasoRecursive(this.casoTree[0])) {
    const caso = {
      _id: this.idCaso,
      label: this.casoTree[0].label,
      data: this.casoTree[0].data,
      children: this.casoTree[0].children
    };
    this.casoService.updateCaso(caso).subscribe(data => {
      this.inicio();
      this.ngOnInit();
      this.notifyService.notify('success', 'Exito', 'CAMBIOS GUARDADOS!');
    }, err => {
      this.notifyService.notify('error', 'ERROR', 'ERROR AL GUARDAR!');
    });
    /* } else {
      this.notifyService.notify('error', 'ERROR', 'FALTA DATOS POR INGRESAR O EXISTEN CAMPOS VACIOS!');
    } */
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
          nodes.children.splice(i, 1);
        } else {
          i++;
          this.buscarQuitarNodo(childNode, id);
        }
      });
    }
  }
  // Buscar un cliente en la lista
  private buscarCliente(ced: any) {
    this.listCliente.forEach(cli => {
      if (ced === cli.cedula) {
        this.selectCliente = cli;
      }
    });
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
    if (!this.campoVacio(node.data.abogado && !this.campoVacio(node.data.fecha_inicio) && !this.campoVacio(node.data.fecha_fin))) {
      if (node.children.length > 0) {
        node.children.forEach(childNode => {
          this.verificarCasoRecursive(childNode);
        });
      } else {
        return true;
      }
    } else {
      return false;
    }
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
  reenviarMail() {
    console.log('hola');
  }
  //#endregion
}
