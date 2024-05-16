import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Evento, RespuestaEventos } from 'src/app/clases/evento';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import {TranslateModule} from "@ngx-translate/core";
import { DeportistasService } from 'src/app/servicios/deportista/deportistas.service';
import { timer } from 'rxjs';
import { PersonasService } from 'src/app/servicios/personas/personas.service';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent, TranslateModule]
})
export class ListarEventosComponent {

  eventosProximos : Evento[] = []
  eventosProximosInicial : Evento[] = []
  eventosCercanos: Evento[] = []
  eventosCercanosInicial: Evento[] = []
  eventosDeportista: Evento[] = []
  eventosDeportistaInicial: Evento[] = []

  mostrarError: boolean = false
  errorMensaje: string = ""

  tipoEventoAnterior: string = "DEPORTISTA"
  asignacionExitosa = false
  eliminacionExitosa = false

  @Input() textoBuscar: string = "";
  @Input() tipoEvento: string = "";

  constructor(private eventosServicio: EventosService, private router: Router, private deportistasService:DeportistasService, private personasService: PersonasService){}

  ngOnChanges(changes: SimpleChanges) {
    if(this.tipoEvento == ""){
      this.tipoEvento = "DEPORTISTA"
      this.eventosDeportista = []
      this.eventosDeportistaInicial = []
      this.getEventosDeportista()
    }
    if(this.textoBuscar != ""){
      this.filtrarEventos(this.textoBuscar)
    }
    if(this.tipoEventoAnterior != this.tipoEvento){
      this.mostrarError = false
      this.errorMensaje = ""
      this.eventosDeportista = []
      this.eventosDeportistaInicial = []
      this.getEventosDeportista()
      this.tipoEventoAnterior = this.tipoEvento

      if(this.tipoEvento == "PROXIMOS"){
        this.getEventosProximos()
      }else if(this.tipoEvento == "DEPORTISTA"){
        this.eventosDeportista = []
        this.eventosDeportistaInicial = []
        this.getEventosDeportista()
      }else{
        this.getEventosCercanos()
      }
    }
  }

  ocultarInscripcion(): void{
    this.eventosCercanos.forEach(ev => {
      this.eventosDeportista.forEach(evDep => {
        if(ev.id == evDep.id){
          ev.inscrito = true
        }
      })
    });
    this.eventosProximos.forEach(ev => {
      this.eventosDeportista.forEach(evDep => {
        if(ev.id == evDep.id){
          ev.inscrito = true
        }
      })
    });
  }

  filtrarEventos(texto: string): void {
    if(this.tipoEvento == "PROXIMOS"){
      this.eventosProximos = this.eventosProximosInicial.filter(evento => evento.nombre.toLowerCase().includes(texto.toLowerCase()))
    }else if(this.tipoEvento == "DEPORTISTA"){
      this.eventosDeportista = this.eventosDeportistaInicial.filter(evento => evento.nombre.toLowerCase().includes(texto.toLowerCase()))
    }else{
      this.eventosCercanos = this.eventosCercanosInicial.filter(evento => evento.nombre.toLowerCase().includes(texto.toLowerCase()))
    }
  }

  getEventosProximos(): void{
    this.eventosServicio.getEventosProximos().subscribe(respuesta => {
      let eventosRespuesta = new RespuestaEventos(respuesta.respuesta, respuesta.token)
      eventosRespuesta.setNuevoToken()

      this.eventosProximos = eventosRespuesta.respuesta;
      this.eventosProximosInicial = eventosRespuesta.respuesta;
      this.ocultarInscripcion()
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarError = true
        if (error.error.description)
          this.errorMensaje = error.error.description
        else
          this.errorMensaje = "Error al consultar la lista de eventos próximos, intente más tarde";
        }
    })
  }

  getEventosCercanos(): void{
    this.personasService.getDireccionUsuario().subscribe(respuestaDir => {
      this.eventosServicio.getEventosCercanos(respuestaDir.ubicacion_latitud, respuestaDir.ubicacion_longitud).subscribe(respuesta => {
        let eventosRespuesta = new RespuestaEventos(respuesta.respuesta, respuesta.token)
        eventosRespuesta.setNuevoToken()
  
        this.eventosCercanos = eventosRespuesta.respuesta;
        this.eventosCercanosInicial = eventosRespuesta.respuesta;
        this.ocultarInscripcion()
      }, error => { 
        if(error.status === 401){
          localStorage.clear()
          this.router.navigate(['/'])
        }else{
          this.mostrarError = true
          if (error.error.description)
            this.errorMensaje = error.error.description
          else
            this.errorMensaje = "Error al consultar la lista de eventos cercanos, intente más tarde";
          }
      })
    });
    
  }

  getEventosDeportista(): void{
    this.eventosServicio.getEventosDeportista().subscribe(respuesta => {
      let eventosDeportistaRespuesta = new RespuestaEventos(respuesta.respuesta, respuesta.token)
      eventosDeportistaRespuesta.setNuevoToken()
      this.eventosDeportista = eventosDeportistaRespuesta.respuesta;
      this.ocultarInscripcion()
      
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarError = true
        if (error.error.description)
          this.errorMensaje = error.error.description
        else
          this.errorMensaje = "Error al consultar la lista de eventos del deportista, intente más tarde";
        }
    })
  }

  verDetalleEvento(idEvento: string): void{
    this.router.navigate(['/eventos/'+idEvento])
  }

  registarEventoAgendaDeportista(idEvento: string): void{
    this.deportistasService.asignarEventoAgendaDeportista(idEvento).subscribe((respuesta) => {
      this.asignacionExitosa = true
      timer(5000).subscribe(x => { this.asignacionExitosa = false })
      this.eventosDeportista = []
      this.eventosDeportistaInicial = []
      this.getEventosDeportista()
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarError = true
        if (error.error.description)
          this.errorMensaje = error.error.description
        else
          this.errorMensaje = "Error al asignar el evento a la agenda del deportista, intente más tarde";
        }
    })
  }

  eliminarEventoAgendaDeportista(idEvento: string): void{
    this.deportistasService.eliminarEventoAgendaDeportista(idEvento).subscribe((respuesta) => {
      this.eliminacionExitosa = true
      timer(5000).subscribe(x => { this.eliminacionExitosa = false })
      this.eventosDeportista = []
      this.eventosDeportistaInicial = []
      this.getEventosDeportista()
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarError = true
        if (error.error.description)
          this.errorMensaje = error.error.description
        else
          this.errorMensaje = "Error al eliminar el evento de la agenda del deportista, intente más tarde";
        }
          
        
    })
  }

}
