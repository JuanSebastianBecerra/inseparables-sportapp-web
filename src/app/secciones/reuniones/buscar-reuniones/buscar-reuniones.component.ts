import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-reuniones',
  templateUrl: './buscar-reuniones.component.html',
  styleUrls: ['./buscar-reuniones.component.scss']
})

export class BuscarReunionesComponent {

  @Output() onBuscarReunion: EventEmitter<string> = new EventEmitter()

  servicioBusqueda: string = "";

  constructor(){}

  buscarReunion(event: any){
    this.onBuscarReunion.emit(this.servicioBusqueda)
  }

}
