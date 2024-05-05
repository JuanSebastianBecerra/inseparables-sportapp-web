import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-buscar-eventos',
  templateUrl: './buscar-eventos.component.html',
  styleUrls: ['./buscar-eventos.component.css'],
  standalone: true,
  imports: [FormsModule, TranslateModule]
})
export class BuscarEventosComponent implements OnInit {

  @Output() onBuscarEvento: EventEmitter<string> = new EventEmitter();
  @Output() onCambiarTipoEvento: EventEmitter<string> = new EventEmitter();

  eventoBusqueda: string = '';
  placeholder: string = '';

  constructor(private translate: TranslateService){}

  ngOnInit(): void {
    this.translate.get('buscar.eventos').subscribe((res: string) => {
      this.placeholder = res;
    });
  }

  buscarEvento(event: any){
    this.onBuscarEvento.emit(this.eventoBusqueda);
  }

  cambiarTipoEvento(value: any){
    this.onCambiarTipoEvento.emit(value.target.value)
  }

}
