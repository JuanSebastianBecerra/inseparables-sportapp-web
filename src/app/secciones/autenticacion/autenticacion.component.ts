import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router"
import { AutorizacionService } from '../../servicios/autorizacion/autorizacion.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ROL_KEY, TOKEN_KEY } from 'src/app/utils/constants';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TranslateModule]
})
export class AutenticacionComponent implements OnInit {

  ingresarForm!: FormGroup;
  validacion: any = undefined;
  responseError: boolean = false;
  responseMessage: String = ""

  constructor(private formBuilder: FormBuilder, private autorizacionService: AutorizacionService, private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    localStorage.clear()
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ingresarForm.controls;
  }

  iniciarFormulario() {
    this.ingresarForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    })
  }

  validateUser(datosIngresar:any) {
    this.autorizacionService.doLogin(datosIngresar).subscribe(response => {
      this.validacion = response
      localStorage.setItem(TOKEN_KEY, response.token)
      localStorage.setItem(ROL_KEY, response.rol)
      this.router.navigate(['/socios'])
    },
    error => {
      this.responseError = true
      if(error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición"
    });
  }

}
