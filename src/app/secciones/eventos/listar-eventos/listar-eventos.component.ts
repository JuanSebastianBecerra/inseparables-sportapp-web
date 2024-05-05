import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Evento, EventoDeportista, RespuestaEventos, RespuestaEventosDeportista } from 'src/app/clases/evento';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent]
})
export class ListarEventosComponent {

  eventosProximos : Evento[] = []
  eventosProximosInicial : Evento[] = []
  eventosCercanos: Evento[] = []
  eventosCercanosInicial: Evento[] = []
  eventosDeportista: EventoDeportista[] = []

  mostrarError: boolean = false
  errorMensaje: string = ""

  tipoEventoAnterior: string = "PROXIMOS"

  @Input() textoBuscar: string = "";
  @Input() tipoEvento: string = "";

  constructor(private eventosServicio: EventosService, private router: Router){}

  ngOnChanges(changes: SimpleChanges) {
    if(this.tipoEvento == ""){
      this.tipoEvento = "PROXIMOS"
      this.getEventosDeportista()
      this.getEventosProximos()
    }
    if(this.textoBuscar != ""){
      this.filtrarEventos(this.textoBuscar)
    }
    if(this.tipoEventoAnterior != this.tipoEvento){
      this.mostrarError = false
      this.errorMensaje = ""
      this.getEventosDeportista()
      this.tipoEventoAnterior = this.tipoEvento
      if(this.tipoEvento == "PROXIMOS"){
        this.getEventosProximos()
      }else{
        this.getEventosCercanos()
      }
    }
  }

  ocultarInscripcion(eventos: Evento[]): void{
    eventos.forEach(ev => {
      this.eventosDeportista.forEach(evDep => {
        if(ev.id == evDep.id_evento){
          ev.inscrito = true
        }
      })
    });
  }

  filtrarEventos(texto: string): void {
    if(this.tipoEvento == "PROXIMOS"){
      this.eventosProximos = this.eventosProximosInicial.filter(evento => evento.nombre.toLowerCase().includes(texto.toLowerCase()))
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
      this.ocultarInscripcion(this.eventosProximos)
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
    this.eventosServicio.getEventosCercanos().subscribe(respuesta => {
      let eventosRespuesta = new RespuestaEventos(respuesta.respuesta, respuesta.token)
      eventosRespuesta.setNuevoToken()

      this.eventosCercanos = eventosRespuesta.respuesta;
      this.eventosCercanosInicial = eventosRespuesta.respuesta;
      this.ocultarInscripcion(this.eventosCercanos)
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
  }

  getEventosDeportista(): void{
    this.eventosServicio.getEventosDeportista().subscribe(respuesta => {
      let eventosDeportistaRespuesta = new RespuestaEventosDeportista(respuesta.respuesta, respuesta.token)
      eventosDeportistaRespuesta.setNuevoToken()

      this.eventosDeportista = eventosDeportistaRespuesta.respuesta;
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

}
