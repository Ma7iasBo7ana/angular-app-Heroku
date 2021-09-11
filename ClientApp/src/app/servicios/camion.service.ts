import { Injectable, inject, Inject  } from '@angular/core';
import { Icamion } from '../interfaces/icamion';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamionService {

  private apiUrl: string = this.baseUrl + "api/Camion"
  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }


  ListarTodos(): Observable<Icamion[]> {
    return this.http.get<Icamion[]>(this.apiUrl);
  }
  ListarPorId(id:number) {
    return this.http.get<Icamion>(this.apiUrl + "/busca/" + id);
  }
  

  Borrar(prodId: number): Observable<any> {
    const headers = {
      'Accept': 'aplication/json'

    }
    return this.http.delete<any>(this.apiUrl + '/' + prodId, { headers });
  }
  Buscar(marcaBuscado:string):Observable<Icamion[]>{
    return this.http.get<Icamion[]>(this.apiUrl + '/' + marcaBuscado)
  }
  
  TraccionS(): Observable<Icamion[]> {
    return this.http.get<Icamion[]>(this.apiUrl + '/traccionSimple');
  }
  TraccionD(): Observable<Icamion[]> {
    return this.http.get<Icamion[]>(this.apiUrl + '/traccionDoble');
  }
  Crear(prod:Icamion):Observable<Icamion>{
    const headers={
      'Accept': 'aplication/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'http://localhost:5000',
      'Access-Control-Allow-Methods':'POST,PUT,GET,DELETE',
    }
    return this.http.post<Icamion>(this.apiUrl,prod,{headers});
  }
  Actualizar(prod:Icamion):Observable<void>{
    prod.id=+prod.id;
    return this.http.put<void>(this.apiUrl+'/'+prod.id,prod)
  }


}
