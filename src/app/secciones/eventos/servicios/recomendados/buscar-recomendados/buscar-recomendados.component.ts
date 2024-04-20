import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-recomendados',
  templateUrl: './buscar-recomendados.component.html',
  styleUrls: ['./buscar-recomendados.component.css']
})
export class BuscarRecomendadosComponent {

  @Output() onBuscarRecomendado: EventEmitter<string> = new EventEmitter();

  recomendadoBusqueda: string = '';

  constructor(private router: Router){}

  buscarRecomendado(event: any){
    this.onBuscarRecomendado.emit(this.recomendadoBusqueda);
  }

}
