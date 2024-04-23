import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";

@Component({
  selector: 'app-crear-entrenamiento',
  templateUrl: './crear-entrenamiento.component.html',
  styleUrls: ['./crear-entrenamiento.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastComponent]
})
export class CrearEntrenamientoComponent implements OnInit{

  entrenamientoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.entrenamientoForm.controls;
  }

  ngOnInit(): void {
    this.iniciarFormulario()
  }

  iniciarFormulario() {
    this.entrenamientoForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      hora_inicio: ["", Validators.required],
      hora_fin: ["", Validators.required],
      lugar: ["", Validators.required],
      frecuencia: ["", Validators.required],
      detalle: ["", Validators.required],
      deporte: ["", Validators.required]
    })
  }

}
