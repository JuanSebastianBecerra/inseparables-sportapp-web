import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
    private router: Router, private cookieService: CookieService) {}

    getServicios(): void {
      this.serviciosService.obtener_servicios().subscribe((respuesta) => {
        let respuestaServicios = new RespuestaServicios(respuesta.respuesta, respuesta.token)
        respuestaServicios.setNuevoToken(this.cookieService)

        this.servicios = respuestaServicios.respuesta;
        this.serviciosInicial = respuestaServicios.respuesta;
      }, error => {
        if(error.status === 401){
          this.cookieService.delete("token")
          this.cookieService.delete("rol")
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
