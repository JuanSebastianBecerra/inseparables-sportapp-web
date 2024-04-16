import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DetalleSocio } from 'src/app/secciones/socios/detalle-socio';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-socios',
  templateUrl: './listaSocios.component.html',
  styleUrls: ['./listaSocios.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})

export class ListaSociosComponent implements OnInit {

  @Input() textoBuscar: string = "";

  socios: Array<DetalleSocio> = [];
  socios_inicial: Array<DetalleSocio> = [];
  selected: boolean = false;
  selectedSocio!: DetalleSocio;

  constructor(
    private socioService: SocioService,
  ) { }

  getSocios() : void {
    this.socioService.getSocios().subscribe((socios) => {
      this.socios = socios;
      this.socios_inicial = socios;
    });
  }
  
  filtrarSocios(texto : string): void{
    this.socios = this.socios_inicial.filter((socio) => socio.nombre.toLowerCase().includes(texto.toLowerCase()) || socio.apellido.toLowerCase().includes(texto.toLowerCase()))
  }

  ngOnInit() {
    this.getSocios();
  } 

  ngOnChanges(changes: SimpleChanges) {
    this.filtrarSocios(changes?.['textoBuscar'].currentValue)
  }
}