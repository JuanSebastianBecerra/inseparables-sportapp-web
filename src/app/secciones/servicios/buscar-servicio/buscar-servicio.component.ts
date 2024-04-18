import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buscar-servicio',
  templateUrl: './buscar-servicio.component.html',
  styleUrls: ['./buscar-servicio.component.scss']
})
export class BuscarServicioComponent {

  @Output() onBuscarServicio: EventEmitter<string> = new EventEmitter()

  servicioBusqueda: string = "";

  constructor(){}

  buscarServicio(event: any){
    this.onBuscarServicio.emit(this.servicioBusqueda)
  }

}
