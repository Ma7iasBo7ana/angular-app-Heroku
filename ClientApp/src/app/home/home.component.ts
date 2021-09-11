import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {AutenticacionService} from '../servicios/autenticacion.service';
import {User} from '../interfaces/user';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstant} from '../interfaces/GlobalConstant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  loginForm:FormGroup;
  logInFlag:boolean= GlobalConstant.IsLoged;
returnUrl:string;
  constructor(
    private formBuilder:FormBuilder,
    private authServ: AutenticacionService,
    private router:Router,
    private ruta:ActivatedRoute
  ) { }


  LogOut(){
    this.logInFlag=false;
    GlobalConstant.IsLoged=false;
    if(this.authServ.estaLogueado){
      this.authServ.logout();
    } 
    this.loginForm=this.formBuilder.group(
      {
        userName:'',
        password:'',
      }
    );
    this.router.navigate(['/']);
    alert("Usuario Deslogueado");
    

  }
}
