import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DetalleSocio, RespuestaSocios } from 'src/app/clases/detalle-socio';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lista-socios',
  templateUrl: './listaSocios.component.html',
  styleUrls: ['./listaSocios.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent]
})

export class ListaSociosComponent implements OnInit {

  @Input() textoBuscar: string = "";

  socios: Array<DetalleSocio> = [];
  socios_inicial: Array<DetalleSocio> = [];
  mostrarErrorGetSocios: boolean = false;
  errorGetSocios: string = ""

  constructor(
    private socioService: SocioService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  getSocios() : void {
    this.socioService.getSocios().subscribe((respuesta) => {
      let respuestaSocios = new RespuestaSocios(respuesta.respuesta, respuesta.token)
      respuestaSocios.setNuevoToken(this.cookieService)

      this.socios = respuestaSocios.respuesta;
      this.socios_inicial = respuestaSocios.respuesta;
    }, error => { 
      if(error.status === 401){
        this.cookieService.delete("token")
        this.cookieService.delete("rol")
        this.router.navigate(['/'])
      }else{
        this.mostrarErrorGetSocios = true
        if (error.error.description)
          this.errorGetSocios = error.error.description
        else
          this.errorGetSocios = "Error al consultar la lista de socios, intente más tarde";
      }
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