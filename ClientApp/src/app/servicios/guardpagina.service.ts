import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AutenticacionService} from '../servicios/autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class GuardpaginaService implements CanActivate {

  constructor(private srvAutenticacion:AutenticacionService, private router: Router) { }

  canActivate(){
    if(!this.srvAutenticacion.estaLogueado()){
      console.log("No esta logueado");
      alert("Debe estar Logueado para ver esta sección");
      this.router.navigate([/*"http://localhost:5001/"]*/'/login']);
      return false;
    }
    console.log("Usuario Valido")
    return true;
  }
}
