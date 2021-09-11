import { Component, OnInit } from '@angular/core';
import { CamioneroService } from '../servicios/camionero.service';
import { Icamionero } from '../interfaces/icamionero';

@Component({
  selector: 'app-camioneros',
  templateUrl: './camioneros.component.html',
  styleUrls: ['./camioneros.component.css']
})
export class CamionerosComponent implements OnInit {
  public listarCamioneros:Icamionero[];
  public campobuscado:string;
  constructor(private servicio:CamioneroService) { }

  ngOnInit() {
    this.mostrarListado();
  }
  mostrarListado(){
    this.servicio.ListarTodos()
    .subscribe (
      resultado=>this.listarCamioneros=resultado,
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
    this.servicio.Buscar(this.campobuscado, this.campobuscado)
    .subscribe(
      resultado=> this.listarCamioneros=resultado,
      error=> console.log(error),
      ()=>console.log("busqueda realizada")
    );
  }
  

  Entregado(){
    this.servicio.Entregado()
    .subscribe(
      resultado=>this.listarCamioneros=resultado,
      error=>console.error(error),
      ()=>console.log("Termino de cargarse la lista")
    );
  }
  Promedio(){
    this.servicio.SalarioPromedio()
    .subscribe(
      resultado => alert("El promedio es de"+resultado),
      error => alert(error)
    );
}
}
