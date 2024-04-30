import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta-servicios',
  templateUrl: './consulta-servicios.component.html',
  styleUrls: ['./consulta-servicios.component.css']
})
export class ConsultaServiciosComponent {

  textoBuscarServicio: string = ""

  onChangeTextBuscarServicio(texto: string){
    this.textoBuscarServicio = texto
  }

}
