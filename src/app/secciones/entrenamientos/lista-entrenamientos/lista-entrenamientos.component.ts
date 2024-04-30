import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {DetalleEntrenamiento} from "../../../clases/entrenamientos";
import {EntrenamientosService} from "../../../servicios/entrenamientos/entrenamientos.service";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-lista-entrenamientos',
  templateUrl: './lista-entrenamientos.component.html',
  styleUrls: ['./lista-entrenamientos.component.css'],
  standalone: true,
  imports: [CommonModule, ToastComponent]
})
export class ListaEntrenamientosComponent implements OnInit{

  entrenamientos: Array<DetalleEntrenamiento> = [];
  entrenamientosInicial: Array<DetalleEntrenamiento> = [];
  mostrarErrorObtenerEntrenamientos: boolean = false;
  errorObtenerEntrenamientos: string = "";

  @Input() textoBuscar: string = "";

  constructor(private entrenamientosService: EntrenamientosService) {
  }
  ngOnInit(): void {
    this.obtenerEntrenamientos()
  }

  obtenerEntrenamientos(){
    this.entrenamientosService.obtenerEntrenamientos().subscribe(
        respuesta => {
          this.entrenamientos = respuesta.entrenamientos;
          this.entrenamientosInicial = respuesta.entrenamientos;
        },
        error => {
          if(error.status === 401){
            localStorage.clear()
          }else{
            this.mostrarErrorObtenerEntrenamientos = true
            if (error.error.description)
              this.errorObtenerEntrenamientos = error.error.description
            else
              this.errorObtenerEntrenamientos = "Error al consultar el listado de los entrenamientos, intente más tarde";
          }
        }
    )
  }

  filtrarEntrenamientos(texto: string) : void {
    this.entrenamientos = this.entrenamientosInicial.filter((entrenamiento) => entrenamiento.nombre.toLowerCase().includes(texto.toLowerCase()))
  }
  ngOnChanges(changes: SimpleChanges){
    this.filtrarEntrenamientos(changes?.['textoBuscar'].currentValue)
  }


}
