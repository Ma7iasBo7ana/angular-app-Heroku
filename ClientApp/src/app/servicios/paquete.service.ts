import { Injectable, inject, Inject } from '@angular/core';
import { Ipaquete } from '../interfaces/ipaquete';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {


  private apiUrl: string = this.baseUrl + "api/Paquete"
  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) { }


  ListarTodos(): Observable<Ipaquete[]> {
    return this.http.get<Ipaquete[]>(this.apiUrl);
  }
  ListarPorId(id:number) {
    return this.http.get<Ipaquete>(this.apiUrl + "/" + id);
  }

  Borrar(prodId: number): Observable<any> {
    const headers = {
      'Accept': 'aplication/json'

    }
    return this.http.delete<any>(this.apiUrl + '/' + prodId, { headers });
  }
  Buscar(idBuscado:string):Observable<Ipaquete[]>{
    return this.http.get<Ipaquete[]>(this.apiUrl + "/Buscar/" + idBuscado)
  }
  Entregado(): Observable<Ipaquete[]> {
    return this.http.get<Ipaquete[]>(this.apiUrl + '/Entregado');
  }
  NoEntregado(): Observable<Ipaquete[]> {
    return this.http.get<Ipaquete[]>(this.apiUrl + '/NoEntregado');
  }
  Crear(prod:Ipaquete):Observable<Ipaquete>{
    const headers={
      'Accept': 'aplication/json',
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'http://localhost:5000',
      'Access-Control-Allow-Methods':'POST,PUT,GET,DELETE',
    }
    return this.http.post<Ipaquete>(this.apiUrl,prod,{headers});
  }
  Actualizar(prod:Ipaquete):Observable<void>{
    prod.id=+prod.id;
    return this.http.put<void>(this.apiUrl+'/Id'+prod.id,prod)
  }
  

}
