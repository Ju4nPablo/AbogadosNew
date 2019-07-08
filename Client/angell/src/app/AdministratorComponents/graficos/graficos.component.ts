import { Component, OnInit } from '@angular/core';
import { CasoService } from '../../Services/caso/caso.service';
import { AbogadoService } from '../../Services/abogado/abogado.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  data: any = {};
  listCaso: any = {};
  listAbogado: any = [];
  selectAbogado: any = '';
  numPendientes: any = 0;
  numAbandonado: any = 0;
  numTerminados: any = 0;
  numActivos: any = 0;

  constructor(
    private casoService: CasoService,
    private abogadoService: AbogadoService,
  ) {
    this.inicio();
  }

  ngOnInit() {
    this.numAbandonado = 0;
    this.numActivos = 0;
    this.numPendientes = 0;
    this.numTerminados = 0;
    this.casoService.allCasoGraficos().subscribe(data => {
      this.listCaso = data;
      for (let caso of this.listCaso) {
        if (caso.data.estado.estado === 'Pendiente')
          this.numPendientes++;
        if (caso.data.estado.estado === 'Activo')
          this.numActivos++;
        if (caso.data.estado.estado === 'Abandono')
          this.numAbandonado++;
        if (caso.data.estado.estado === 'Terminado' || caso.data.estado.estado === 'Pasivo')
          this.numTerminados++;
      }
      this.data = {
        labels: ['Pendientes', 'Activos', 'Abandonados', 'Terminados'],
        datasets: [
          {
            data: [this.numPendientes, this.numActivos, this.numAbandonado, this.numTerminados],
            backgroundColor: [
              "#FF6384",
              "#2E9AFE",
              "#A0A79E",
              "#65C546",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#2E9AFE",
              "#A0A79E",
              "#65C546",
            ]
          }]
      };
    });
  }

  inicio() {
    this.listAbogado = [];
    this.selectAbogado = '';
    this.numAbandonado = 0;
    this.numActivos = 0;
    this.numPendientes = 0;
    this.numTerminados = 0;
    this.abogadoService.getAbogadoTipo().subscribe(data => {
      this.listAbogado = data;
      this.listAbogado.unshift({ _id: '-1', nombre: 'Seleccione' });
      this.selectAbogado = this.listAbogado[0];
    });
  };

  generar() {
    this.numAbandonado = 0;
    this.numActivos = 0;
    this.numPendientes = 0;
    this.numTerminados = 0;
    this.casoService.allCasoGraficos().subscribe(data => {
      this.listCaso = data;
      for (let caso of this.listCaso) {
        this.verificarCasoRecursive(caso);
      }
      this.data = {
        labels: ['Pendientes', 'Activos', 'Abandonados', 'Terminados'],
        datasets: [
          {
            data: [this.numPendientes, this.numActivos, this.numAbandonado, this.numTerminados],
            backgroundColor: [
              "#FF6384",
              "#2E9AFE",
              "#A0A79E",
              "#65C546",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#2E9AFE",
              "#A0A79E",
              "#65C546",
            ]
          }]
      };
    });
  };

  private verificarCasoRecursive(node) {
    if (node.data.abogado.id === this.selectAbogado._id) {
      if (node.data.estado.estado === 'Pendiente')
        this.numPendientes++;
      if (node.data.estado.estado === 'Activo')
        this.numActivos++;
      if (node.data.estado.estado === 'Abandono')
        this.numAbandonado++;
      if (node.data.estado.estado === 'Terminado' || node.data.estado.estado === 'Pasivo')
        this.numTerminados++;
    }
    if (node.children.length > 0) {
      node.children.forEach(childNode => {
        this.verificarCasoRecursive(childNode);
      });
    }
  }

}
