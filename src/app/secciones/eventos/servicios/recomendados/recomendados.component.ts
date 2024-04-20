import { Component } from '@angular/core';

@Component({
  selector: 'app-recomendados',
  templateUrl: './recomendados.component.html',
  styleUrls: ['./recomendados.component.css']
})
export class RecomendadosComponent {

  textoBuscarRecomendado : string = ""

  onChangeTextoBuscarRecomendado(texto: string){
    this.textoBuscarRecomendado = texto
  }

}
