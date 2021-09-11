import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Icamionero } from '../../interfaces/icamionero';
import { Router, ActivatedRoute } from '@angular/router';
import { CamioneroService } from '../../servicios/camionero.service'
import { error } from 'protractor';


@Component({
  selector: 'app-camioneros-form',
  templateUrl: './camioneros-form.component.html',
  styleUrls: ['./camioneros-form.component.css']
})
export class CamionerosFormComponent implements OnInit {

  formCamioneros: FormGroup;
  camioneroId: number;
  modoEdicion: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private CamioneroService: CamioneroService) { 
      this.ActivatedRoute.params.subscribe(
        params => {
          this.camioneroId = params['id'];
  
          if (isNaN(this.camioneroId)) {
            return;
          }
          else {
            this.modoEdicion = true;
            this.CamioneroService.ListarPorId(this.camioneroId)
              .subscribe(
                resultado => this.cargarFormulario(resultado),
                error => console.error(error)
              );
            }

          }
        )
      }
    

  ngOnInit() {
    this.formCamioneros = this.fb.group(
      {
        nombre: '',
        apellido: '',
        domicilio: '',
        telefono: '',
        salario: ''
        

      }
    )
  }
  cargarFormulario(camionero: Icamionero) {
    this.formCamioneros.patchValue({
      nombre: camionero.nombre,
      apellido: camionero.apellido,
      domicilio: camionero.domicilio,
      telefono: camionero.telefono,
      salario: camionero.salario
      
    })
  }
  save() {
    let paqueteFormulario: Icamionero = Object.assign({}, this.formCamioneros.value);
    
    if (this.modoEdicion) {
      paqueteFormulario.id=+this.camioneroId;  
      this.CamioneroService.Actualizar(paqueteFormulario)
        .subscribe(
          resultado => alert("Modificado OK"),
          error => alert(error)

        );
    }
    else
      this.CamioneroService.Crear(paqueteFormulario)
        .subscribe(
          resultado => alert("Modificado OK"),
          error => alert(error)
        );
  }
}
