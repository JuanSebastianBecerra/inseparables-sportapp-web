import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento, RespuestaEvento } from 'src/app/clases/evento';
import { DeportesService } from 'src/app/servicios/deporte/deportes.service';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { SocioService } from 'src/app/servicios/socios/socios.service';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit{

  constructor(private route: ActivatedRoute, private eventosService: EventosService, 
    private router: Router, private sociosService: SocioService, private deporteService: DeportesService){}

  eventoId: string = ""
  eventoDetalle!: Evento
  responseError: boolean = false
  responseMessage: string = ""
  nombreDeporte: string = ""
  nombreSocio: string = ""

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('idEvento')!;
    this.obtenerDetalleEvento()
  }

  obtenerInfoSocio(socioId: string): void{
    this.sociosService.getSocioId(socioId).subscribe(respuesta =>{
      this.nombreSocio = respuesta.respuesta.nombre + " " + respuesta.respuesta.apellido 
    })
  }

  obtenerDeportes(idDeporte: string): void{
    this.deporteService.obtenerDeportes().subscribe(respuesta => {
      respuesta.body.forEach((element:any) => {
        if (element.id == idDeporte){
          this.nombreDeporte = element.nombre
        }
      });
    })
  }

  obtenerDetalleEvento(): void{
    this.eventosService.getDetalleEvento(this.eventoId).subscribe(respuesta => {
      let respuestaEvento = new RespuestaEvento(respuesta.respuesta, respuesta.token);
      respuestaEvento.setNuevoToken()
      this.eventoDetalle = respuestaEvento.respuesta
      this.obtenerInfoSocio(this.eventoDetalle.id_socio)
      this.obtenerDeportes(this.eventoDetalle.id_deporte)
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.responseError = true
        if (error.error.description)
          this.responseMessage = error.error.description
        else
          this.responseMessage = "Error al consultar el detalle del evento, intente más tarde";
        }
    })
  }

  verServiciosRecomendados(idEvento:string){
    this.router.navigate(['/eventos/'+idEvento+"/servicios"])
  }

  cancelar(): void{
    this.router.navigate(['/eventos'])
  }

  modificarEvento(){
    this.router.navigate(["/modificar-evento/"+this.eventoId ]) 
  }

}
