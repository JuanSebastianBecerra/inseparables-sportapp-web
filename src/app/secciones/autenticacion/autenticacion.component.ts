import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../../servicios/autorizacion/autorizacion.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AutenticacionComponent implements OnInit {

  ingresarForm!: FormGroup;
  validacion: any = undefined;

  constructor(private formBuilder: FormBuilder, private autorizacionService: AutorizacionService) { }

  ngOnInit(): void {
    this.inicarFormulario();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ingresarForm.controls;
  }

  inicarFormulario() {
    this.ingresarForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  validateUser(datosIngresar:any) {
    this.autorizacionService.doLogin(datosIngresar).subscribe(response => this.validacion = response);
  }

}
