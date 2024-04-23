import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-buscar-entrenamiento',
  templateUrl: './buscar-entrenamiento.component.html',
  styleUrls: ['./buscar-entrenamiento.component.scss']
})
export class BuscarEntrenamientoComponent {

  @Output() onBuscarEntrenamiento: EventEmitter<string> = new EventEmitter();

  entrenamientoBusqueda: string = '';

  constructor(){}

  buscarEntrenamiento(event: any){
    this.onBuscarEntrenamiento.emit(this.entrenamientoBusqueda);
  }


}
