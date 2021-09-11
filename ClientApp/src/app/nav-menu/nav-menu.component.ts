import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {AutenticacionService} from '../servicios/autenticacion.service';
import {User} from '../interfaces/user';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstant} from '../interfaces/GlobalConstant';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  loginForm:FormGroup;
  logInFlag:boolean= GlobalConstant.IsLoged;
returnUrl:string;
  constructor(
    private formBuilder:FormBuilder,
    private authServ: AutenticacionService,
    private router:Router,
    private ruta:ActivatedRoute
  ) { }
  isExpanded = false;

  ngOnInit() {
    
    // if(this.authServ.estaLogueado){
    //   document.getElementById("boton").style.display='block';//setAttribute("disabled","");
      
            
    // } 
    // else{
    //   document.getElementById("boton").style.display='none';//removeAttribute("disabled");
      

    // }
  }

  

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
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
