import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-socio',
  templateUrl: './buscar-socio.component.html',
  styleUrls: ['./buscar-socio.component.scss']
})
export class BuscarSocioComponent {

  @Output() onBuscarSocio: EventEmitter<string> = new EventEmitter();

  socioBusqueda: string = '';

  constructor(private router: Router){}

  buscarSocio(event: any){
    this.onBuscarSocio.emit(this.socioBusqueda);
  }


}
