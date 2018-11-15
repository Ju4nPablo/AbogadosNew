import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

@Injectable()
export class AbogadoService {

  public url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addAbogado(abogado) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.url + 'abogado', abogado, { headers });
  }

  updateAbogado(abogado) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.url + 'abogado/' + abogado._id, abogado, { headers });
  }

  getAbogadoTipo() {
    const params = new HttpParams()
      .append('estado', '0'); // si desea filtrar por mas campos agrega un nuevo params.
    return this.httpClient.get(this.url + 'abogado/', { params });
  }

  getAbogadoCedula(ced) {
    const params = new HttpParams()
      .append('cedula', ced); // si desea filtrar por mas campos agrega un nuevo params.
    return this.httpClient.get(this.url + 'abogado/', { params });
  }

  /* filterAbogado(abogado) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'abogado/' + abogado._id, abogado, { headers: headers })
      .map(res => res.json());
  } */

  listAbogado() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(this.url + 'abogado', { headers });
  }

}
