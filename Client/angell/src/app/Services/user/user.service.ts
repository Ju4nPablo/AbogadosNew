import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

@Injectable()
export class UserService {
  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  addUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'saveUser', user, { headers });
  }

  updateUser(user) {
    if (user.password === '') {
      const use = {
        cedula: user.cedula,
        mail: user.mail,
        tipo: user.tipo,
        estado: user.estado
      };
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.put(this.url + 'user/' + user._id, use, { headers });
    } else {
      const use = {
        cedula: user.cedula,
        mail: user.mail,
        tipo: user.tipo,
        estado: user.estado,
        password: user.password
      };
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.put(this.url + 'updateUser/:id' + user._id, use, { headers });
    }
  }

  getUserTipo() {
    const params = new HttpParams()
      .append('estado', '0'); // si desea filtrar por mas campos agrega un nuevo params.
    return this.http.get(this.url + 'user/', { params });
  }

  getUserCedula(ced) {
    const params = new HttpParams()
      .append('cedula', ced); // si desea filtrar por mas campos agrega un nuevo params.
    return this.http.get(this.url + 'user/', { params });
  }

  listUser() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url + 'user', { headers });
  }

}
