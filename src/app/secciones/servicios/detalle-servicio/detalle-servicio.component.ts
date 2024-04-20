import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DeportesService } from 'src/app/servicios/administracion/deportes.service';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { SocioService } from 'src/app/servicios/socios/socios.service';

import { RespuestaSocios } from 'src/app/clases/detalle-socio';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { DetalleServicio, RespuestaServicio } from 'src/app/clases/servicios';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ToastComponent]
})
export class DetalleServicioComponent implements OnInit {
  servicioForm!: FormGroup;
  deportes: any[] = []
  socios: any[] = []
  responseError: boolean = false;
  responseMessage: String = ""
  exitoso: boolean = false

  constructor(private formBuilder: FormBuilder, private deportesService: DeportesService, 
    private socioService: SocioService, private servicioService: ServiciosService,
    private router: Router, private route: ActivatedRoute) {}

  get f(): { [key: string]: AbstractControl } {
    return this.servicioForm.controls;
  }

  ngOnInit(): void {
    this.obtenerServicio()
    this.obtenerDeportes()
    this.obtenerSocios()
    this.iniciarFormulario()
      
  }

  obtenerServicio() :void{
    let servicioSeleccionado = this.route.snapshot.paramMap.get("idServicio")
    this.servicioService.obtenerServicioPorId(servicioSeleccionado != null ? servicioSeleccionado : "").subscribe(respuesta => {
      let respuestaServicio = new RespuestaServicio(respuesta.respuesta, respuesta.token)
      respuestaServicio.setNuevoToken()
      let servicio = respuestaServicio.respuesta
      this.llenarFormulario(servicio)
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

  obtenerDeportes():void{
    this.deportesService.obtenerDeportes().subscribe(response => {
      this.deportes = response.body;
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
    this.servicioForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      valor: ["", Validators.required],
      detalle: ["", Validators.required],
      descripcion: ["", Validators.required],
      socioNegocio: ["", Validators.required],
      deporte: ["", Validators.required]
    })
  }

  llenarFormulario(servicio: DetalleServicio) {
    let socioNegocio = this.socios.filter(((socio) => socio.id = servicio.id_socio ))[0]
    let deporte = this.deportes.filter(((dep) => dep.id = servicio.id_deporte ))[0]
    this.servicioForm = this.formBuilder.group({
      nombre: [servicio.nombre],
      valor: [servicio.valor],
      detalle: [servicio.detalle],
      descripcion: [servicio.descripcion],
      socioNegocio: [socioNegocio != undefined ? socioNegocio.nombre + " " + socioNegocio.apellido : ""],
      deporte: [deporte != undefined ? deporte.nombre : ""]
    })
  }

  cancelar(): void{
    this.router.navigate(['/servicios'])
  }
}
