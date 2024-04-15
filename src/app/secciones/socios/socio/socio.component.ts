import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SocioService } from 'src/app/servicios/socios/socios.service';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class SocioComponent implements OnInit {

  socioForm!: FormGroup;
  responseError: boolean = false;
  responseMessage: String = ""
  exitoso = false

  constructor(private formBuilder: FormBuilder, private socioService: SocioService, private router: Router) { }

  ngOnInit(): void {
    this.inicarFormulario()
  }

  get f(): { [key: string]: AbstractControl } {
    return this.socioForm.controls;
  }

  inicarFormulario() {
    this.socioForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      tipo_identificacion: ["", Validators.required],
      numero_identificacion: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirmPwd: ["", Validators.required],
      detalle: [""],
    })
  }

  registrarSocio(bodyRequest:any) {
    this.socioService.registrarSocio(bodyRequest).subscribe(response => {
      this.exitoso = true
        setTimeout(() => {
          this.router.navigate(['/socios'])
        }, 2000);
    },
    error => {
      this.responseError = true
      if(error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }


}

