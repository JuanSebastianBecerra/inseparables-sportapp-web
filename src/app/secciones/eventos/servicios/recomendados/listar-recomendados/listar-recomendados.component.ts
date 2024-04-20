import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { Servicio } from 'src/app/clases/servicio';
import { ServiciosRecomendadosService } from 'src/app/servicios/eventos/servicios-recomendados.service';
import { RespuestaServiciosRecomendados } from 'src/app/clases/detalle-servicio-recomendado';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DeportistasService } from 'src/app/servicios/deportista/deportistas.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-listar-recomendados',
  templateUrl: './listar-recomendados.component.html',
  styleUrls: ['./listar-recomendados.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent]
})
export class ListarRecomendadosComponent implements OnInit{
  @Input() textoBuscar: string = "";

  serviciosRecomendados: Array<Servicio> = [];
  serviciosRecomendadosInicial: Array<Servicio> = [];
  mostrarErrorGetServiciosRecomendados: boolean = false;
  errorGetServiciosRecomendados: string = ""
  asignacionExitosa = false

  constructor(
    private route: ActivatedRoute, private serviciosRecomendadosService: ServiciosRecomendadosService,
    private router: Router, private socioService: SocioService, private deportistasService: DeportistasService
  ) { }

  getInformacionSocio(): void{
    this.serviciosRecomendadosInicial.forEach((servRecom) => {
      this.socioService.getSocioId(servRecom.id_socio).subscribe((respuesta) => {
        servRecom.nombre_socio = respuesta.respuesta.nombre + " " + respuesta.respuesta.apellido
      }, error => { 
        if(error.status === 401){
          localStorage.clear()
          this.router.navigate(['/'])
        }else{
          this.mostrarErrorGetServiciosRecomendados = true
          if (error.error.description)
            this.errorGetServiciosRecomendados = error.error.description
          else
            this.errorGetServiciosRecomendados = "Error al consultar el detalle del socio, intente más tarde";
          }
      })
    }); 
  }

  getServiciosRecomendadosPorEvento(idEvento: string): void{
    this.serviciosRecomendadosService.getServiciosRecomendadosPorEvento(idEvento).subscribe((respuesta) => {
      let respuestaServiciosRecomendados = new RespuestaServiciosRecomendados(respuesta.respuesta, respuesta.token)
      respuestaServiciosRecomendados.setNuevoToken()

      this.serviciosRecomendados = respuestaServiciosRecomendados.respuesta;
      this.serviciosRecomendadosInicial = respuestaServiciosRecomendados.respuesta;
      this.getInformacionSocio()
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarErrorGetServiciosRecomendados = true
        if (error.error.description)
          this.errorGetServiciosRecomendados = error.error.description
        else
          this.errorGetServiciosRecomendados = "Error al consultar la lista de servicios recomendados, intente más tarde";
        }
    });
  }
  
  filtrarServiciosRecomendados(texto : string): void{
    this.serviciosRecomendados = this.serviciosRecomendadosInicial.filter((recomendado) => recomendado.nombre.toLowerCase().includes(texto.toLowerCase()))
  }

  solicitarEvento(idServicio: string): void{
    this.deportistasService.asignarServicioADeportista(idServicio).subscribe((respuesta) => {
      this.asignacionExitosa = true
      timer(5000).subscribe(x => { this.asignacionExitosa = false })
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarErrorGetServiciosRecomendados = true
        if (error.error.description)
          this.errorGetServiciosRecomendados = error.error.description
        else
          this.errorGetServiciosRecomendados = "Error al asignar el serivicio al deportista, intente más tarde";
        }
    })
  }

  ngOnInit() {
    let idEvento = this.route.snapshot.paramMap.get("idEvento")
    this.getServiciosRecomendadosPorEvento(idEvento != null ? idEvento : "")
  } 

  ngOnChanges(changes: SimpleChanges) {
    this.filtrarServiciosRecomendados(changes?.['textoBuscar'].currentValue)
  }
}
