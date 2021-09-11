import { Inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import {User} from '../interfaces/user';
import {GlobalConstant} from '../interfaces/GlobalConstant';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  
  public usuarioActual:Observable<User>;
  private apiUrl=this.baseUrl + 'api/usuario'
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl) {

   }
   login (userName:string, password:string){
     const UsuarioApi:User={
       userName:userName,
       password:password,
       fullName:"",
       userRole:"",
       token:""
     };
     return this.http.post<any>(this.apiUrl + '/login' ,UsuarioApi)
     .pipe(
       map(respuesta=> {
         console.log("Respuesta api:", respuesta);
         localStorage.setItem("UsuarioGuardado",JSON.stringify(respuesta))
         GlobalConstant.IsLoged=true;

         return respuesta;
       })
     );
   }
   estaLogueado(){
     var logueado=false;
     var user=JSON.parse(localStorage.getItem('UsuarioGuardado'));
     if(user){
       const token=user["token"];
       console.log(token);
       logueado=true;
       
       
     } 
     return logueado;
   }
   logout(){
     localStorage.removeItem('UsuarioGuardado');
   }
}
