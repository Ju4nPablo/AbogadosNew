import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notification: any = ['a'];
  status: boolean;
  showMenu = {
    showDashboard: true,
    showUsuario: true,
    showCliente: true,
    showAbogado: true,
    showFlujo: true,
    showCasos: true,
    showReporte: true,
  };

  constructor() {
    this.status = false;
    const us = JSON.parse(localStorage.getItem('userLogin'));
    if (us.tipo === '2') {
      this.showMenu = {
        showDashboard: false,
        showUsuario: false,
        showCliente: false,
        showAbogado: false,
        showFlujo: false,
        showCasos: true,
        showReporte: false,
      };
    }
    if (us.tipo === '3') {
      this.showMenu = {
        showDashboard: false,
        showUsuario: false,
        showCliente: false,
        showAbogado: false,
        showFlujo: false,
        showCasos: true,
        showReporte: false,
      };
    }
  }


  notifications: any;
  cantidad_notificaciones:number;
  status: boolean;
  msgs:any =[];
  constructor() {
    this.status = false;
  }

  ngOnInit() {

    this.notifications = [
      {titulo:'tramite juzgado 1', estado:'1',color:'rojo',redireccion:''},
      {titulo:'tramite juzgado 1', estado:'1',color:'rojo',redireccion:''},
      {titulo:'tramite juzgado 1', estado:'1',color:'rojo',redireccion:''},
      {titulo:'tramite juzgado 1', estado:'1',color:'amarillo',redireccion:''},
      {titulo:'tramite juzgado 1', estado:'1',color:'amarillo',redireccion:''},
      {titulo:'tramite juzgado 1', estado:'1',color:'amarillo',redireccion:''},
      {titulo:'tramite juzgado 1', estado:'1',color:'amarillo',redireccion:''}
    ];
    this.cantidad_notificaciones=this.notifications.length;


  }

}
