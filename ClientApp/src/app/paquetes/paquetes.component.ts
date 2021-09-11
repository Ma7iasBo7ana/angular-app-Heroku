import { Component, OnInit } from '@angular/core';
import { PaqueteService } from '../servicios/paquete.service';
import { Ipaquete } from '../interfaces/ipaquete';


@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {

  public listarPaquetes: Ipaquete[];
  public campobuscado: string;
  constructor(private servicio: PaqueteService) { }


  ngOnInit() {
    this.mostrarListado();
  }

  mostrarListado() {
    this.servicio.ListarTodos()
      .subscribe(
        resultado => this.listarPaquetes = resultado,
        error => console.error(error),
        () => console.log("Termino de cargarse la lista")
      );
  }

  borrar(prodId: number) {
    this.servicio.Borrar(prodId).
      subscribe(
        resultado => console.dir(resultado),
        error => console.dir(error),
        () => this.mostrarListado(),

      );
  }
  Buscar() {
    this.servicio.Buscar(this.campobuscado)
      .subscribe(
        resultado => this.listarPaquetes = resultado,
        error => console.log(error),
        () => console.log("busqueda realizada")
      );
  }

  Entregado() {
    this.servicio.Entregado()
      .subscribe(
        resultado => this.listarPaquetes = resultado,
        error => console.error(error),
        () => console.log("Termino de cargarse la lista")
      );
  }
  NoEntregado() {
    this.servicio.NoEntregado()
      .subscribe(
        resultado => this.listarPaquetes = resultado,
        error => console.error(error),
        () => console.log("Termino de cargarse la lista")
      );
  }

  // Crear() {
  //   var productoNuevo: Ipaquete;
  //   // productoNuevo = {
  //   //   id: 20,
  //   //   descripcion: "a",
  //   //   destinatario: "a",
  //   //   direccionDestinatario: "a",
  //   //   entregado: true,
  //   //   camionero: 10,
  //   //   provincia: 10,
  //   // };
  //   this.servicio.Crear(productoNuevo).
  //   subscribe(
  //     ()=>this.mostrarListado(),
  //   );
  // }
  // Modificar(pId:number){
  //   var productoModificado: Ipaquete;
  //   // productoModificado = {
  //   //   id: pId,
  //   //   descripcion: "b",
  //   //   destinatario: "b",
  //   //   direccionDestinatario: "b",
  //   //   entregado: true,
  //   //   camionero: 10,
  //   //   provincia: 10,
  //   // };
  //   this.servicio.Actualizar(productoModificado)
  //   .subscribe(
  //     resultado=>alert("Actualizado:" + resultado),
  //     error=>alert(error),
  //     ()=>this.mostrarListado(),
  //   );
  // }



}
