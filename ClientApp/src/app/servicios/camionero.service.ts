import { Injectable, inject, Inject } from '@angular/core';
import { Icamionero } from '../interfaces/icamionero';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamioneroService {
  

  private apiUrl: string = this.baseUrl + "api/Camionero"
  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }


  ListarTodos(): Observable<Icamionero[]> {
    return this.http.get<Icamionero[]>(this.apiUrl);
  }
  ListarPorId(id:number) {
    return this.http.get<Icamionero>(this.apiUrl + "/busca/" + id);
  }
  Borrar(prodId: number): Observable<any> {
    const headers = {
      'Accept': 'aplication/json'

    }
    return this.http.delete<any>(this.apiUrl + '/' + prodId, { headers });
  }
  Buscar(nombre:string,apellido:string):Observable<Icamionero[]>{
    return this.http.get<Icamionero[]>(this.apiUrl + '/nombre/' + nombre + '/apellido/' + apellido );
  }
  Entregado(): Observable<Icamionero[]> {
    return this.http.get<Icamionero[]>(this.apiUrl + '/Salario');
  }
  SalarioPromedio(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/SalarioPromedio');
  }
  Crear(prod:Icamionero):Observable<Icamionero>{
    const headers={
      'Accept': 'aplication/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'http://localhost:5000',
      'Access-Control-Allow-Methods':'POST,PUT,GET,DELETE',
    }
    return this.http.post<Icamionero>(this.apiUrl,prod,{headers});
  }
  Actualizar(prod:Icamionero):Observable<void>{
    prod.id=+prod.id;
    return this.http.put<void>(this.apiUrl+'/'+prod.id,prod)
  }

}
