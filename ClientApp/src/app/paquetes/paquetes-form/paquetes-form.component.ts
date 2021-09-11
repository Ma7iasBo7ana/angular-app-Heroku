import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ipaquete } from '../../interfaces/ipaquete';
import { Router, ActivatedRoute } from '@angular/router';
import { PaqueteService } from '../../servicios/paquete.service'
import { error } from 'protractor';

@Component({
  selector: 'app-paquetes-form',
  templateUrl: './paquetes-form.component.html',
  styleUrls: ['./paquetes-form.component.css']
})
export class PaquetesFormComponent implements OnInit {

  formPaquetes: FormGroup;
  paqueteId: number;
  modoEdicion: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private PaqueteService: PaqueteService) {
    this.ActivatedRoute.params.subscribe(
      params => {
        this.paqueteId = params['id'];

        if (isNaN(this.paqueteId)) {
          return;
        }
        else {
          this.modoEdicion = true;
          this.PaqueteService.ListarPorId(this.paqueteId)
            .subscribe(
              resultado => this.cargarFormulario(resultado),
              error => console.error(error)
            );

        }

      }
    )
  }

  ngOnInit() {
    this.formPaquetes = this.fb.group(
      {
        descripcion: '',
        destinatario: '',
        direccionDestinatario: '',
        camionero: '',
        provincia: '',
        entregado: ''

      }
    )
  }

  cargarFormulario(paquete: Ipaquete) {
    this.formPaquetes.patchValue({
      descripcion: paquete.descripcion,
      destinatario: paquete.destinatario,
      direccionDestinatario: paquete.direccionDestinatario,
      camionero: paquete.camionero.nombre,
      provincia: paquete.provincia.nombre,
      entregado: paquete.entregado
    })
  }

  save() {
    let paqueteFormulario: Ipaquete = Object.assign({}, this.formPaquetes.value);
    
    if (this.modoEdicion) {
      paqueteFormulario.id=+this.paqueteId;  
      this.PaqueteService.Actualizar(paqueteFormulario)
        .subscribe(
          resultado => alert("Modificado OK"),
          error => alert(error)

        );
    }
    else
      this.PaqueteService.Crear(paqueteFormulario)
        .subscribe(
          resultado => alert("Modificado OK"),
          error => alert(error)
        );
  }

}
