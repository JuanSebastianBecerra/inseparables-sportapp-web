import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonasService} from "../../../servicios/personas/personas.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-perfil-deportista',
  templateUrl: './perfil-deportista.component.html',
  styleUrls: ['./perfil-deportista.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class PerfilDeportistaComponent implements OnInit {

  perfilForm!: FormGroup;
  responseError: boolean = false;
  responseMessage: String = ""

  constructor(private formBuilder: FormBuilder, private personasService: PersonasService) {
  }

  ngOnInit(): void {
    this.iniciarFormularioPerfil()
  }

  iniciarFormularioPerfil() {
    this.perfilForm = this.formBuilder.group({
      genero: ["", Validators.required],
      edad: ["", Validators.required],
      peso: ["", Validators.required],
      altura: ["", Validators.required],
      paisNacimiento: ["", Validators.required],
      ciudadNacimiento: ["", Validators.required],
      paisResidencia: ["", Validators.required],
      ciudadResidencia: ["", Validators.required],
      antiguedad: ["", Validators.required],
      tipoSangre: ["", Validators.required],
      imc: ["", Validators.required],
      horasEjercicio: ["", Validators.required],
      pesoObjetivo: ["", Validators.required],
      alergias: ["", Validators.required],
      deporte: ["", Validators.required],
      preferenciaAlimenticia: ["", Validators.required],
      planNutricional: ["", Validators.required],
      historiaClinica: ["", Validators.required]
    })
  }


  guardarPerfil(bodyPerfil: Object){
    console.log(bodyPerfil);
  }

}
