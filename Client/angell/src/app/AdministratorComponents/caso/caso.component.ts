import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CasoService } from '../../Services/caso/caso.service';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';
import { SendEmailService } from '../../Services/send-email/send-email.service';
import { ActividadExtraService } from '../../Services/actividad-extra/actividad-extra.service';
import { nodeValue } from '@angular/core/src/view';

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
  showImagen: Boolean = false;
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
    showQuitar: true,
    showAnadirFoto: true,
    showMail: true,
  };
  listaEliminarActividad: any = [];
  numeroCaso: any = '';

  // agregar caso nuevo.
  showDialogIng: any = false;
  casoTreeNew: TreeNode[];

  constructor(
    private casoService: CasoService,
    private clienteService: ClienteService,
    private abogadoService: AbogadoService,
    private notifyService: NotificacionesService,
    private sendEmailService: SendEmailService,
    private actividadAgenda: ActividadExtraService
  ) {
    this.inicio();
  }

  inicio() {

    this.showDialogIng = false;

    const us = JSON.parse(localStorage.getItem('userLogin'));
    this.listaEliminarActividad = [];
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
      this.casoService.allCasoPendientes().subscribe(data => {
        this.listCaso = data;
        this.cargarTabla(this.listCaso);
        this.cargarCaso();
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
        showQuitar: true,
        showAnadirFoto: true,
        showMail: true,
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
      { field: 'numeroCarpeta', header: 'Número Carpeta' },
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
    this.showDialogImagenes = false;
    this.showImagen = false;
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
        precio: '0',
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
        abogado: '',
        descripcion_abogado: '',
        descripcion_cliente: '',
        precio: '0',
        imagenes: ['assets/papel.png', 'assets/papel.png', 'assets/papel.png'],
        estado: this.listEstado[0]
      }
    };
    this.cliente = '';
  }

  cargarCaso() {
    const caso = JSON.parse(localStorage.getItem('caso'));
    if (caso !== null && caso !== '' && caso !== undefined) {
      this.idCaso = caso._id;
      this.cliente = this.buscarCliente(caso.data.cliente.cedula);
      this.casoTree = [caso];
      this.expandAll();
      this.banClose = false;
      this.banOpen = true;
      this.showDialogMod = true;
      this.showDialogMod = true;
      localStorage.setItem('caso', null);
    }
  }

  cargarTabla(lista) {
    lista.forEach(item => {
      // let cli = this.buscarCliente(item.data.cliente.cedula);
      this.listTabla.push({
        id: item._id,
        label: item.label,
        cliente: item.data.cliente.nombre,
        abogado: item.data.abogado.nombre,
        numeroCarpeta: this.buscarCliente(item.data.cliente.cedula).numeroCarpeta
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

    this.casoTreeNew = [
      {
        label: 'Nombre del flujo',
        data: {
          id: this.generarID(),
          fecha_inicio: new Date,
          fecha_fin: new Date,
          abogado: Object,
          descripcion_abogado: '',
          descripcion_cliente: '',
          imagenes: [],
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
        this.expandAll();
        this.banClose = false;
        this.banOpen = true;
      }
    });
  }

  //#region Ingresar nuevo caso
  showDialogAdd() {
    this.casoTreeNew = [
      {
        label: 'Nombre del flujo',
        data: {
          id: this.generarID(),
          fecha_inicio: new Date,
          fecha_fin: new Date,
          abogado: Object,
          descripcion_abogado: '',
          descripcion_cliente: '',
          imagenes: [],
          estado: this.listEstado[0]
        },
        children: []
      }
    ];
    this.showDialogIng = true;
  }

  //#endregion

  //#region Trabajo con el nodo add, uptade, delete, carga
  loadNode(event) {
    this.selectNode = {};
    this.selectNode = event.node;
    this.banClose = false;
    this.banOpen = false;
  }

  // Añadir un nodo.
  addNodo() {
    this.selectNode = {
      label: 'Nodo New',
      data: {
        id: this.generarID(),
        fecha_inicio: new Date,
        fecha_fin: new Date,
        abogado: Object,
        descripcion_abogado: '',
        descripcion_cliente: '',
        imagenes: [],
        estado: this.listEstado[0]
      },
      children: []
    };
    this.caso.node.children.push(this.selectNode);
    this.showDialog = false;
    this.showDialogHijos = false;
  }

  // Modificar un nodo
  updateNodo() {
    let fech = '';
    if (!this.campoVacio(this.fechaInicio) && !this.campoVacio(this.fechaFin) &&
      !this.campoVacio(this.info.label) && !this.campoVacio(this.selectAbogado)) {
      if (this.casoTree[0].label === this.info.label) {
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
      this.node.label = this.info.label;
      const newData = {
        id: this.node.data.id,
        fecha_inicio: this.fechaInicio,
        fecha_fin: fech,
        descripcion_abogado: this.info.data.descripcion_abogado,
        descripcion_cliente: this.info.data.descripcion_cliente,
        cliente: cli,
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
    } else {
      this.notifyService.notify('error', 'ERROR', 'EXISTEN CAMPOS VACÍOS!');
    }
  }
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
      this.listaEliminarActividad.forEach(act => {
        const actividad = {
          id_actividad_caso: act
        };
        this.actividadAgenda.deleteActividadExtraIdCaso(actividad).subscribe();
      });
      this.inicio();
    });
  }
  updateCaso() {
    const caso = {
      _id: this.idCaso,
      label: this.casoTree[0].label,
      data: this.casoTree[0].data,
      children: this.casoTree[0].children
    };
    this.numeroCaso = this.casoTree[0].label;
    this.casoService.updateCaso(caso).subscribe(data => {
      this.recorrerUpdateActividades(this.casoTree[0]);
      this.inicio();
      this.ngOnInit();
      this.notifyService.notify('success', 'Exito', 'CAMBIOS GUARDADOS!');
    }, err => {
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
          if (childNode.children.length === 0) {
            this.listaEliminarActividad.push(childNode.data.id);
            nodes.children.splice(i, 1);
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
  // recorrer el nodo para guardar las actividades.
  recorrerUpdateActividades(nodoActividad: TreeNode) {
    const act = {
      label: nodoActividad.label,
      data: nodoActividad.data
    };
    this.updateActividad(act);
    if (nodoActividad.children) {
      nodoActividad.children.forEach(childNode => {
        this.recorrerUpdateActividades(childNode);
      });
    }
  }
  // Guadar actividad en la agenda.
  updateActividad(datosCalendario) {
    const actividad = {
      'id_actividad_caso': datosCalendario.data.id.toString(),
      'caso_numero': this.numeroCaso,
      'actividad': datosCalendario.label,
      'fecha_inicio': datosCalendario.data.fecha_inicio,
      'fecha_fin': datosCalendario.data.fecha_fin,
      'prioridad': 'yellow',
      'abogado': datosCalendario.data.abogado.id,
      'hora_inicio': '8:00',
      'hora_fin': '16:00',
      'repetir': 'Nunca',
      'recordatorio': '1 hora antes'
    };
    this.actividadAgenda.updateActividadExtraIdCaso(actividad).subscribe();

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
  enviarMail() {
    const mailCliente = {
      destinatario: this.cliente.mail,
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
  // Boton salir arbol
  exitArbol() {
    this.inicio();
  }
  // Boton salir formulario
  exitForm() {
    this.showDialog = false;
    this.showDialogHijos = false;
  }
  //#endregion
}
