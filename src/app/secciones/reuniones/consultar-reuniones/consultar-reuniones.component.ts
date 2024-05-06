import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-consultar-reuniones',
  templateUrl: './consultar-reuniones.component.html',
  styleUrls: ['./consultar-reuniones.component.scss'],
  providers: [TranslateModule]
})
export class ConsultarReunionesComponent {

  textoBuscarReunion: string = ""

  onChangeTextBuscarReunion(texto: string){
    this.textoBuscarReunion = texto
  }

}