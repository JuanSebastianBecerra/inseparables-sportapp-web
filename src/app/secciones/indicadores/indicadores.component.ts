import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Indicador, IndicadorRespuesta } from 'src/app/clases/indicador';
import { SesionEntrenamientoService } from 'src/app/servicios/sesion_entrenamiento/sesionEntrenamiento.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit{

  constructor(private sesionEntrenamientoService: SesionEntrenamientoService, private router: Router,){}

  indicadores: Indicador[] = []
  indicadoresPaginados: Map<number, Indicador[]> = new Map()
  indicadoresMostrar?: Indicador[] = []
  mostrarError: boolean = false
  errorTexto : string = ""
  pages: number = 1
  paginaActiva: number = 1

  paginar(): void{
    let records = 10;
    for (let i = 1; i <= this.pages; i++) {
      let start = (i-1) * records // 0
      let end = i * records // 10
      if (this.pages == i){
        end = this.indicadores.length -((this.pages - 1) * 10) + start
      }
      this.indicadoresPaginados.set(i, this.indicadores.slice(start, end))
    } 
    if (this.indicadoresPaginados.has(1)){
      this.indicadoresMostrar = this.indicadoresPaginados.get(1)
      this.paginaActiva = 1
    }
    
  }

  seleccionarPagina(pagina: number): void{
    if (this.indicadoresPaginados.has(pagina)){
      this.indicadoresMostrar = this.indicadoresPaginados.get(pagina)
      this.paginaActiva = pagina
    }
  }

  siguientePagina(): void{
    let siguientePagina = this.paginaActiva + 1
    if (this.indicadoresPaginados.has(siguientePagina)){
      this.indicadoresMostrar = this.indicadoresPaginados.get(siguientePagina)
      this.paginaActiva = siguientePagina
    }
  }

  retrocederPagina(): void{
    let paginaAnterior = this.paginaActiva - 1
    if (this.indicadoresPaginados.has(paginaAnterior)){
      this.indicadoresMostrar = this.indicadoresPaginados.get(paginaAnterior)
      this.paginaActiva = paginaAnterior
    }
  }

  consultarIndicadores(): void{
    this.sesionEntrenamientoService.calcularIndicadores().subscribe((respuesta) => {
      let respuestaIndicadores = new IndicadorRespuesta(respuesta.respuesta, respuesta.token)
      respuestaIndicadores.setNuevoToken()
      this.indicadores = respuestaIndicadores.respuesta;
      this.pages = Math.ceil( respuestaIndicadores.respuesta.length / 10 ); 
      this.paginar()
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarError = true
        if (error.error.description)
          this.errorTexto = error.error.description
        else
          this.errorTexto = "Error al consultar la lista de socios, intente más tarde";
      }
    })
  }

  ngOnInit(): void {
    this.consultarIndicadores();
  }

  

}
