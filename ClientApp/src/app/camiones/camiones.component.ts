import { Component, OnInit } from '@angular/core';
import {CamionService} from '../servicios/camion.service';
import {Icamion} from '../interfaces/icamion';

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.css']
})
export class CamionesComponent implements OnInit {

  public listarCamiones:Icamion[];
  public campobuscado:string;
  constructor(private servicio:CamionService) { }

  ngOnInit() {
    this.mostrarListado();
  }

  mostrarListado(){
    this.servicio.ListarTodos()
    .subscribe (
      resultado=>this.listarCamiones=resultado,
      error=>console.error(error),
      ()=>console.log("Termino de cargarse la lista")
    );
  }
  borrar(prodId:number){
    this.servicio.Borrar(prodId).
    subscribe(
      resultado=>console.dir(resultado),
      error=>console.dir(error),
      ()=>this.mostrarListado(),

    );
  }
  Buscar(){
    this.servicio.Buscar(this.campobuscado)
    .subscribe(
      resultado=> this.listarCamiones=resultado,
      error=> console.log(error),
      ()=>console.log("busqueda realizada")
    );
  }
  TraccionS(){
    this.servicio.TraccionS()
    .subscribe(
      resultado=>this.listarCamiones=resultado,
      error=>console.error(error),
      ()=>console.log("Termino de cargarse la lista")
    );
  }
  TraccionD(){
    this.servicio.TraccionD()
    .subscribe(
      resultado=>this.listarCamiones=resultado,
      error=>console.error(error),
      ()=>console.log("Termino de cargarse la lista")
    );
  }
}
