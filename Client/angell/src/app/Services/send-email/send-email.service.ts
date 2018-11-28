import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GLOBAL } from '../global';

@Injectable()
export class SendEmailService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
  }

  sendNotifications(mailDaemon) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url + 'sendMail', mailDaemon, { headers });
  }

}
