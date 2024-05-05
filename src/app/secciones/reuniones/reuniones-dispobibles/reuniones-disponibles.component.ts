import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ReunionesService } from 'src/app/servicios/reuniones/reuniones.service';
import { Router } from '@angular/router';
import { RespuestaReuniones, Reunion } from 'src/app/clases/reunion';

@Component({
  selector: 'app-reuniones-disponibles',
  templateUrl: './reuniones-disponibles.component.html',
  styleUrls: ['./reuniones-disponibles.component.scss']
})

export class ReunionesDisponiblesComponent implements OnInit {

  @Input() textoBuscar: string = "";

  reuniones: Array<Reunion> = [];
  reuniones_inicial: Array<Reunion> = [];
  mostrarErrorGetReuniones: boolean = false;
  errorGetReuniones: string = ""
  exitoso = false

  constructor(
    private reunionService: ReunionesService,
    private router: Router
  ) { }

  getReunionesDisponibles() : void {
    this.reunionService.getReunionesDisponibles().subscribe((respuesta) => {
      let respuestaReuniones = new RespuestaReuniones(respuesta.respuesta, respuesta.token)
      respuestaReuniones.setNuevoToken()

      this.reuniones = respuestaReuniones.respuesta;
      this.reuniones_inicial = respuestaReuniones.respuesta;
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarErrorGetReuniones = true
        if (error.error.description)
          this.errorGetReuniones = error.error.description
        else
          this.errorGetReuniones = "Error al consultar la lista de sesiones disponibles";
      }
    });
  }
  
  filtrarReuniones(texto : string): void{
    this.reuniones = this.reuniones_inicial.filter((reunion) => reunion.lugar.toLowerCase().includes(texto.toLowerCase()) || reunion.nombre_entrenador.toLowerCase().includes(texto.toLowerCase()))
  }

  ngOnInit() {
    this.getReunionesDisponibles();
  } 

  ngOnChanges(changes: SimpleChanges) {
    this.filtrarReuniones(changes?.['textoBuscar'].currentValue)
  }

  agendarSesion(id:string){
    this.reunionService.agendarSesion(id).subscribe(response => {

      this.exitoso = true
        setTimeout(() => {
          this.getReunionesDisponibles();
        }, 2000);
    },
    error => {
      this.mostrarErrorGetReuniones = true
      if(error.error.description)
        this.errorGetReuniones = error.error.description
      else
        this.errorGetReuniones = "Ocurrió un error al realizar la petición";
      setTimeout(() => {
        window.parent.location = window.parent.location.href;
      }, 2000);
    });

  }
}
