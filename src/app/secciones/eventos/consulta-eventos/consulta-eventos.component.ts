import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-eventos',
  templateUrl: './consulta-eventos.component.html',
  styleUrls: ['./consulta-eventos.component.css']
})
export class ConsultaEventosComponent {

  textoBuscarEvento : string = ""
  tipoEvento : string = ""

  onChangeTextoBuscarEvento(texto: string){
    this.textoBuscarEvento = texto
  }

  onChangeTipoEvento(tipo: string){
    this.tipoEvento = tipo
  }

}
