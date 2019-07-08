import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../Models/User';
import { GLOBAL } from './global';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  url: any = GLOBAL.urlLogin;

  constructor(private http: Http) {
    this.url = GLOBAL.urlLogin;

  }
  
  login(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url, user, { headers: headers }).map(res => res.json());
  }
}
