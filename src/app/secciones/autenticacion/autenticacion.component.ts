import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router"
import { AutorizacionService } from '../../servicios/autorizacion/autorizacion.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class AutenticacionComponent implements OnInit {

  ingresarForm!: FormGroup;
  validacion: any = undefined;
  responseError: boolean = false;
  responseMessage: String = ""

  constructor(private formBuilder: FormBuilder, private autorizacionService: AutorizacionService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.inicarFormulario();
    this.cookieService.delete("token")
    this.cookieService.delete("rol")
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
    this.autorizacionService.doLogin(datosIngresar).subscribe(response => {
      this.validacion = response
      this.cookieService.set("token", response.token)
      this.cookieService.set("rol", response.rol)
      this.router.navigate(['/home'])
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
