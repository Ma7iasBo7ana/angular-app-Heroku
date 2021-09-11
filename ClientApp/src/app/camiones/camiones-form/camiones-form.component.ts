import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Icamion } from '../../interfaces/icamion';
import { Router, ActivatedRoute } from '@angular/router';
import { CamionService } from '../../servicios/camion.service'
import { error } from 'protractor';

@Component({
  selector: 'app-camiones-form',
  templateUrl: './camiones-form.component.html',
  styleUrls: ['./camiones-form.component.css']
})
export class CamionesFormComponent implements OnInit {

  formCamiones: FormGroup;
  CamionId: number;
  modoEdicion: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private CamionService: CamionService) {
    this.ActivatedRoute.params.subscribe(
      params => {
        this.CamionId = params['id'];

        if (isNaN(this.CamionId)) {
          return;
        }
        else {
          this.modoEdicion = true;
          this.CamionService.ListarPorId(this.CamionId)
            .subscribe(
              resultado => this.cargarFormulario(resultado),
              error => console.error(error)
            );

        }

      }
    )
  }

  ngOnInit() {
    this.formCamiones = this.fb.group(
      {
        modelo: '',
        marca: '',
        traccion: '',
        transmision: ''
        
        

      }
    )
  }

  cargarFormulario(camion: Icamion) {
    this.formCamiones.patchValue({
      modelo: camion.modelo,
      marca: camion.marca,
      traccion: camion.traccion,
      transmision: camion.transmision
      
    })
  }

  save() {
    let paqueteFormulario: Icamion = Object.assign({}, this.formCamiones.value);
    
    if (this.modoEdicion) {
      paqueteFormulario.id=+this.CamionId;  
      this.CamionService.Actualizar(paqueteFormulario)
        .subscribe(
          resultado => alert("Camion Modificado"),
          error => alert(error)

        );
    }
    else
      this.CamionService.Crear(paqueteFormulario)
        .subscribe(
          resultado => alert("Camion Agregado"),
          error => alert(error)
        );
  }

}
