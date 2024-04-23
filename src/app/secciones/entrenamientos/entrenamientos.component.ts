import { Component } from '@angular/core';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
  styleUrls: ['./entrenamientos.component.css']
})
export class EntrenamientosComponent {

  textoBuscarEntrenamiento: string = "";

  onChangeTextoBuscarEntrenamiento(texto: string){
    this.textoBuscarEntrenamiento = texto
  }

}
