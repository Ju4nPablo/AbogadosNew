import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

@Injectable()
export class ActividadExtraService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addActividadExtra(actividadExtra) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'actividad_extra/', actividadExtra, { headers });
  }

  updateActividadExtra(actividadExtra) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'actividad_extra/' + actividadExtra._id, actividadExtra, { headers });
  }

  deleteActividadExtra(actividadExtra) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.url + 'actividad_extra/' + actividadExtra._id);
  }

  listActividadExtra() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'actividad_extra', { headers });
  }

  listActividadExtraPorCedula(abogado) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllActividadesPorCedula', abogado, { headers });
  }

  listActividadExtraPorCedulaUsuario(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllActividadesPorCedulaUsuario', user, { headers });
  }

  listActividadExtraPorUsuario(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'getAllActividadesPorUsuario', user, { headers });
  }

  urlAcceso() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'linkCorreo', { headers: headers });
  }

  updateActividadExtraIdCaso(actividadExtra) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'updateActividad', actividadExtra, { headers });
  }

  deleteActividadExtraIdCaso(actividadExtra) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'deleteActividad', actividadExtra, { headers });
  }

  deleteActividadExtraIdEstado(actividadExtra) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'deleteActividadEstado', actividadExtra, { headers });
  }

}
