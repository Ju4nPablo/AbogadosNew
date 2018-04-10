import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Http,Response,Headers}from'@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../Models/User';
import{GLOBAL}from './global';
import 'rxjs/add/operator/map';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};*/
let url:any;
@Injectable()
export class LoginService {

  constructor(private http:Http) {
   // this.url = GLOBAL.url;

  }

  login(user:User) {
    console.log(user);
      let headers= new Headers({'Content-Type':'application/json'});
      return this.http.post('http://localhost:3000/api/login', user,{headers:headers} ).map(res=> res.json());



    //  .map((res:Response) => res.json());

      /*.subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );*/

  }
}
