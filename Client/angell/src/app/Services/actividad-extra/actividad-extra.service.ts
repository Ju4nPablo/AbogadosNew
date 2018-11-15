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
    console.log(actividadExtra);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.url + 'actividad_extra/' + actividadExtra._id, actividadExtra, { headers });
  }

  listActividadExtra() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'actividad_extra', { headers });
  }

  urlAcceso() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'linkCorreo', { headers: headers });
  }

}
