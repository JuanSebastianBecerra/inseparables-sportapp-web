import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DeportesService } from 'src/app/servicios/deporte/deportes.service';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { timer } from 'rxjs';
import { SPACE_ASCII_CHAR_NUMBERS, ZERO_ASCII_CHAR_NUMBERS, NINE_ASCII_CHAR_NUMBERS } from 'src/app/utils/constants';

import { RespuestaSocios } from 'src/app/clases/detalle-socio';
import { Router, RouterModule } from '@angular/router';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';


import {DxDateBoxModule} from "devextreme-angular";
import { CrearEventoService } from 'src/app/servicios/eventos/crear-evento.service';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastComponent, DxDateBoxModule, RouterModule, TranslateModule]
})
export class CrearEventoComponent implements OnInit {

  eventoForm!: FormGroup;
  deportes: any[] = []
  socios: any[] = []
  responseError: boolean = false;
  responseMessage: String = ""
  exitoso: boolean = false
  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();

  constructor(private formBuilder: FormBuilder, private deportesService: DeportesService, 
    private socioService: SocioService, private eventoService: CrearEventoService,
    private router: Router) {}

  get f(): { [key: string]: AbstractControl } {
    return this.eventoForm.controls;
  }

  ngOnInit(): void {
    this.iniciarFormulario()
    this.obtenerDeportes()
    this.obtenerSocios()
  }

  obtenerDeportes():void{
    this.deportesService.obtenerDeportes().subscribe(response => {
      this.deportes = response.body;
    },
    error => {
      this.responseError = true
      if (error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }
  
  obtenerSocios():void{
    this.socioService.getSocios().subscribe(respuesta => {
      let respuestaSocios = new RespuestaSocios(respuesta.respuesta, respuesta.token)
      respuestaSocios.setNuevoToken()
      this.socios = respuestaSocios.respuesta
    },
    error => {
      this.responseError = true
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        if (error.error.description)
          this.responseMessage = error.error.description
        else
          this.responseMessage = "Ocurrió un error al realizar la petición";
      }
    });
  }

  iniciarFormulario() {
    this.eventoForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      fecha_inicio: ["", Validators.required],
      fecha_fin: ["", Validators.required],
      detalle: ["", Validators.required],
      id_socio: ["", Validators.required],
      id_deporte: ["", Validators.required]
    })
  }

  guardarEvento(bodyRequest: any){
    this.eventoService.registrarEvento(bodyRequest).subscribe(response => {
      this.exitoso = true
      this.eventoForm.reset()
      timer(5000).subscribe(x => { this.router.navigate(["/eventos"]) })
      
    },
      error => {
        this.exitoso = false
        this.responseError = true
        if (error.error.description)
          this.responseMessage = error.error.description
        else
          this.responseMessage = "Ocurrió un error al realizar la petición";
      });

  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > SPACE_ASCII_CHAR_NUMBERS && (charCode < ZERO_ASCII_CHAR_NUMBERS || charCode > NINE_ASCII_CHAR_NUMBERS)) {
      return false;
    }
    return true;
  }

}

