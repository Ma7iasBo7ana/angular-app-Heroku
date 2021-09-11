import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {AutenticacionService} from '../servicios/autenticacion.service';
import {User} from '../interfaces/user';
import {Router,ActivatedRoute} from '@angular/router';
import {GlobalConstant} from '../interfaces/GlobalConstant';
import { error } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;
returnUrl:string;

  constructor(
    private formBuilder:FormBuilder,
    private authServ: AutenticacionService,
    private router:Router,
    private ruta:ActivatedRoute
  ) { }

  ngOnInit() {
    if(this.authServ.estaLogueado){
      this.authServ.logout();
    } 
    this.loginForm=this.formBuilder.group(
      {
        userName:'',
        password:'',
      }
    );
    this.returnUrl=this.ruta.snapshot.queryParams['returnUrl']|| /*"http://localhost:5001/"*/'/';
  }

 

  Loguear(){
    let usuarioFormulario: User=Object.assign({},this.loginForm.value);
    
    
    this.authServ.login(usuarioFormulario.userName,usuarioFormulario.password)
    .subscribe(
      resultado=>{
        
        console.log(resultado);
        this.router.navigate([this.returnUrl]);
      },

      error=> alert("Credenciales incorrectas ")
      
      
      
      
    )
  }

}
