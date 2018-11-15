import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FlujoProcesoService } from '../../Services/flujo-proceso/flujo-proceso.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-flujo-proceso',
  templateUrl: './flujo-proceso.component.html',
  styleUrls: ['./flujo-proceso.component.css']
})
export class FlujoProcesoComponent implements OnInit {

  //#region Variables

  msgs: any = [];
  casoTree: TreeNode[];
  selectNode: TreeNode;
  node: any;
  showDialog: Boolean = false;
  caso: any = {};
  selectEstado: any = {};
  listEstado: any = [];


  constructor(
    public flujoProcesoService: FlujoProcesoService,
    public notifyService: NotificacionesService
  ) {
    this.inicio();
  }
  //#endregion

  //#region Inicio de programa
  inicio() {
    this.listEstado = [{
      id: '1',
      estado: 'Proceso'
    },
    {
      id: '2',
      estado: 'Terminado'
    }];
    this.node = {
      label: '',
      data: {
        id: '',
        descripcion: '',
        estado: this.listEstado[0]
      }
    };
    this.selectEstado = this.listEstado[0];
    this.showDialog = false;
    this.caso = {};
  }

  ngOnInit() {
    this.casoTree = [
      {
        label: 'Inicio',
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

  //#region Trabajo con el nodo add, uptade, delete, carga
  loadNode(event) {
    this.selectNode = {};
    this.selectNode = event.node;
  }

  addNodo() {
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
    this.inicio();
  }

  updateNodo() {
    this.casoTree.forEach(nodes => {
      this.buscarRemplazarEstado(nodes, this.node.data.id);
    });
    this.inicio();
  }

  deleteNodo() {
    this.casoTree.forEach(nodes => {
      this.buscarQuitarNodo(nodes, this.node.data.id);
    });
    this.inicio();
  }

  selectNodo(event) {
    this.caso = event;
    this.node = event.node;
    this.selectEstado = this.node.data.estado;
    this.caso.node = this.node;
    event = this.caso;
    this.showDialog = true;
  }
  //#endregion

  //#region Guardar Diagrama
  save() {
    const flujo = {
      label: this.casoTree[0].label,
      data: this.casoTree[0].data,
      children: this.casoTree[0].children
    };
    this.flujoProcesoService.addFlujoProceso(flujo).subscribe(data => {
      this.inicio();
      this.ngOnInit();
      this.notifyService.notify('success', 'Exito', 'Ingreso existoso!');
    }, err => {
      this.notifyService.notify('error', 'ERROR', 'ERROR CONEXIÓN!');
    });
  }
  //#endregion

  //#region Metodos generarID, recorrer arbol
  generarID() {
    const f = new Date();
    return (f.getTime());
  }

  exit() {
    this.inicio();
  }

  expandAll() {
    this.casoTree.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.casoTree.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

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
  //#endregion

}
