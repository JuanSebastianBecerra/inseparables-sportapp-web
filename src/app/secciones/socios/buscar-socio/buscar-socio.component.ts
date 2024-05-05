import { Component, EventEmitter, Output } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-buscar-socio',
  templateUrl: './buscar-socio.component.html',
  styleUrls: ['./buscar-socio.component.scss'],
  providers: [TranslateModule]
})
export class BuscarSocioComponent {

  @Output() onBuscarSocio: EventEmitter<string> = new EventEmitter();

  socioBusqueda: string = '';

  constructor(){}

  buscarSocio(event: any){
    this.onBuscarSocio.emit(this.socioBusqueda);
  }


}
