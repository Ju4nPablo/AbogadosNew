import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

@Injectable()
export class ClienteService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addCliente(cliente) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'cliente', cliente, { headers });
  }

  updateCliente(cliente) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'cliente/' + cliente._id, cliente, { headers });
  }

  getClienteTipo() {
    const params = new HttpParams()
      .append('estado', '0'); // si desea filtrar por mas campos agrega un nuevo params.
    return this.http.get(this.url + 'cliente/', { params });
  }

  getClienteCedula(ced) {
    const params = new HttpParams()
      .append('cedula', ced); // si desea filtrar por mas campos agrega un nuevo params.
    return this.http.get(this.url + 'cliente/', { params });
  }

  listCliente() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'cliente', { headers });
  }

}
