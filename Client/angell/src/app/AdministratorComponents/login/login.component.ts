import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../Models/User';
import {LoginService} from '../../Services/login.service';
import {consoleTestResultHandler} from "tslint/lib/test";
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
//import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  msgs: Message[] = [];
  public user:User;
  constructor(
     // private _route: ActivatedRouter,
      private  router:Router,
      private _serviceLogin:LoginService,
       private messageService: MessageService
  ) {
   // this.title='Login'
    this.user= new User("","",1,"","");
  }

  ngOnInit() {


  }

  public login(){
    console.log(this.user);
    try{
      this._serviceLogin.login(this.user).subscribe(
        response =>{
        console.log(response);
        if(response.user._id){
          console.log('correcto');
        localStorage.setItem('userLogin',JSON.stringify(response.user));
          this.messageService.add({severity:'success', summary:'Ingreso Correcto', detail:'Bienvenido'});
          if(response.user.tipo=='1'){
            this.router.navigateByUrl('/dashboard');
          }else{
            this.router.navigateByUrl('/dashboardcliente');
          }
        }else{
          console.log('error');
          this.messageService.add({severity:'error', summary:'Error Usuario o contraseña ', detail:'Verifique su usuario y contraseña'});
        }

      }, error=>{
          if(<any>error.status!=401){


            if(<any>error.status!=404){

                if(<any>error.status==502) {


                  console.log('error servidor');
                }
            }else{
              console.log('Error login');
              this.messageService.add({severity:'error', summary:'Error Usuario o contraseña ', detail:'Verifique su usuario y contraseña'});
            }
          }else{
              console.log('ingresar campos');
            this.messageService.add({severity:'error', summary:'Ingresar campos para realizar el ingreso', detail:'Verifique su usuario y contraseña'});
          }
      });

    }catch (exception)
    {
      console.log(exception.message)
    }
  }

}
