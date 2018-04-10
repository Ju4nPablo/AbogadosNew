import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardcliente',
  templateUrl: './dashboardcliente.component.html',
  styleUrls: ['./dashboardcliente.component.css']
})
export class DashboardclienteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      nombre: {
        title: 'Nombre proceso'
      },
      tipo: {
        title: 'Tipo de proceso'
      },
      fecha: {
        title: 'Fecha de apertura'
      },
      desc: {
        title: 'Descripción'
      },
      attr: {
        class: 'table-bordered table-hover table-responsive'
      }
    }
  };

  data = [
    {
      id: 'PJ001',
      nombre: "Peculado",
      tipo: "Penal",
      fecha: "25/01/2018",
      desc: "Proceso inciado en la ciudad de Quito"
    },
    {
      id: 'PJ002',
      nombre: "Divorcio",
      tipo: "Penal",
      fecha: "08/02/2018",
      desc: "Existe acuerdo mutuo"
    },
    
    // ... list of items
    
    {
      id: 'PJ003',
      nombre: "Compra Terrenos",
      tipo: "Civil",
      fecha: "10/03/2018",
      desc: "Proceso inciado en la ciudad de Quito"
    }
  ];

}
