import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

@Injectable()
export class CasoService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addCaso(caso) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'caso', caso, { headers });
  }

  updateCaso(caso) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'caso/' + caso._id, caso, { headers });
  }

  allCasoGraficos() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'caso/', { headers });
  }

  allCaso() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'getAllCasos', { headers });
  }

  allCasoFechas(fechas) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosFechas', fechas, { headers });
  }

  allCasoPendientes() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'getAllCasosPendientes', { headers });
  }

  allCasoEstado(est) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosPorEstado', est, { headers });
  }

  allCasoAbogado(abog) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosPorAbogado', abog, { headers });
  }

  allCasoAbogadoEstado(abog) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosPorAbogadoEstado', abog, { headers });
  }

  allCasoCliente(cli) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosPorCliente', cli, { headers });
  }

  allCasoClienteEstado(cli) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosPorClienteEstado', cli, { headers });
  }

  allCasoAbogadoCliente(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosAbogadoCliente', obj, { headers });
  }

  allCasoAbogadoClienteEstado(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosAbogadoClienteEstado', obj, { headers });
  }

  allCasoAbogadoFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosAbogadoFecha', obj, { headers });
  }

  allCasoAbogadoClienteFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosAbogadoClienteFecha', obj, { headers });
  }

  allCasoAbogadoEstadoFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosAbogadoEstadoFecha', obj, { headers });
  }

  allCasoAbogadoClienteEstadoFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosAbogadoClienteEstadoFecha', obj, { headers });
  }

  allCasoClienteEstadoFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosClienteEstadoFecha', obj, { headers });
  }

  AllCasoClientePendiente(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasoClientePendiente', obj, { headers });
  }

  AllCasoAbogadoPendiente(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasoAbogadoPendiente', obj, { headers });
  }

  // cliente
  allCasoClienteFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosClienteFecha', obj, { headers });
  }

  allCasoEstadoFecha(obj) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllCasosEstadoFecha', obj, { headers });
  }

}
