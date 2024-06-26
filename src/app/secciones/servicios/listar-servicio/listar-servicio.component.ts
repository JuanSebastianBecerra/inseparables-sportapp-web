import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { DetalleServicio, RespuestaServicios } from 'src/app/clases/servicios';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';

@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css']
})
export class ListarServicioComponent implements OnInit {

  @Input() textoBuscar : string = ""

  servicios: Array<DetalleServicio> = [];
  serviciosInicial: Array<DetalleServicio> = [];
  mostrarErrorServicios : boolean = false;
  errorServicios: string = ""

  constructor(private serviciosService: ServiciosService, 
    private router: Router) {}

    getServicios(): void {
      this.serviciosService.obtenerServicios().subscribe((respuesta) => {
        let respuestaServicios = new RespuestaServicios(respuesta.respuesta, respuesta.token)
        respuestaServicios.setNuevoToken()

        this.servicios = respuestaServicios.respuesta;
        this.serviciosInicial = respuestaServicios.respuesta;
      }, error => {
        if(error.status === 401){
          localStorage.clear()
          this.router.navigate(['/'])
        }else{
          this.mostrarErrorServicios = true
          if (error.error.description)
            this.errorServicios = error.error.description
          else
            this.errorServicios = "Error al consultar la lista de socios, intente más tarde";
        }
      })
    }

    filtrarServicios(texto: string) : void {
      this.servicios = this.serviciosInicial.filter((servicio) => servicio.nombre.toLowerCase().includes(texto.toLowerCase()))
    }

    ngOnInit(): void {
      this.getServicios()
    }

    ngOnChanges(changes: SimpleChanges){
      this.filtrarServicios(changes?.['textoBuscar'].currentValue)
    }
}
