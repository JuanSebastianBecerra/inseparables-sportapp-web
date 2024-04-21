import { Component } from '@angular/core';

@Component({
  selector: 'app-consultar-reuniones',
  templateUrl: './consultar-reuniones.component.html',
  styleUrls: ['./consultar-reuniones.component.scss']
})
export class ConsultarReunionesComponent {

  textoBuscarReunion: string = ""

  onChangeTextBuscarReunion(texto: string){
    this.textoBuscarReunion = texto
  }

}