import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaEventos } from 'src/app/clases/evento';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { TOKEN_KEY, ULTIMA_CONEXION_KEY } from 'src/app/utils/constants';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {

  notificaciones : number = 0
  ocultarNotificaciones : boolean = this.router.url == "/" 
  nuevasNotificaciones : boolean = false
  consultado : boolean = false
  
  constructor(private router: Router, private eventosService: EventosService, private personasService: PersonasService){

    router.events.subscribe((val) => {
      
      this.ocultarNotificaciones = this.router.url == "/" || 
                    this.router.url == "/registro" || 
                    this.router.url == "/suscripciones" || 
                    this.router.url == "/perfil-deportista"
      
      if(this.router.url == "/socios"){
        const ultima_conexion = localStorage.getItem(ULTIMA_CONEXION_KEY)
        if(ultima_conexion != undefined && ultima_conexion != null && ultima_conexion != "" && !this.consultado){
          personasService.getDireccionUsuario().subscribe(respuestaDir => {
            eventosService.getNuevosEventosCercanos(parseFloat(ultima_conexion), respuestaDir.ubicacion_latitud, respuestaDir.ubicacion_longitud).subscribe(respuesta => {
              this.consultado = true
              let respuestaEventos = new RespuestaEventos(respuesta.respuesta, respuesta.token)
              respuestaEventos.setNuevoToken()
              if(respuestaEventos.respuesta.length > 0){
                this.notificaciones = respuestaEventos.respuesta.length
                this.nuevasNotificaciones = true
              }
            })
          })
        }
      }
    })
  }

  

  

}
