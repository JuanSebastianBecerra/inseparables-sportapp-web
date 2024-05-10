import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {DetalleEntrenamiento} from "../../../clases/entrenamientos";
import {EntrenamientosService} from "../../../servicios/entrenamientos/entrenamientos.service";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";
import {CommonModule} from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { CLIENT_ID_STRAVA, CLIENT_SECRET_STRAVA, TOKEN_KEY, TOKEN_STRAVA } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

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
  code:any;
  baseUrl=window.location.origin+"/entrenamientos";
  stravaLinkAuth="";
  idUser: string = "";
  exitoso = false;
  authorized = false;
  mensajeExitoso="";

  @Input() textoBuscar: string = "";

  constructor(private entrenamientosService: EntrenamientosService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.authorized = localStorage.getItem(TOKEN_STRAVA) != null;
    this.mostrarErrorObtenerEntrenamientos=false;
    this.obtenerEntrenamientos()
    this.code=this.activatedRoute.snapshot.queryParamMap.get('code');
    this.getId()
    if(this.code !=null && localStorage.getItem(TOKEN_STRAVA) == null){
      this.getTokenStrava()
      this.authorized =true
    }
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
            this.router.navigate(['/'])
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

  getId(){     
    this.entrenamientosService.getId().subscribe(      
        respuesta => {  
          this.idUser= respuesta.id_usuario 
          this.getStravaInfo()
        },
        error => {
          if(error.status === 401){
            localStorage.clear()
            this.router.navigate(['/'])
          }else{
            this.mostrarErrorObtenerEntrenamientos = true
            if (error.error.description)
              this.errorObtenerEntrenamientos = error.error.description
            else
              this.errorObtenerEntrenamientos = "Error al obtener id";
          }
        }
    )
  }

  getStravaInfo(){   
    this.entrenamientosService.getStravaInfo(this.idUser).subscribe(      
        respuesta => {  
          this.stravaLinkAuth=environment.baseUrlStrava+"/oauth/authorize?"+"client_id="+respuesta.strava_client_id+"&redirect_uri="+this.baseUrl+"&response_type=code&scope=activity:write,activity:read_all";
          localStorage.setItem(CLIENT_ID_STRAVA, respuesta.strava_client_id )
          localStorage.setItem(CLIENT_SECRET_STRAVA, respuesta.strava_client_secret )
        },
        error => {
          if(error.status === 401){
            localStorage.clear()
            this.router.navigate(['/'])
          }else{
            this.mostrarErrorObtenerEntrenamientos = true
            if (error.error.description)
              this.errorObtenerEntrenamientos = error.error.description
            else
              this.errorObtenerEntrenamientos = "Error al obtener información Strava del usuario";
          }
        }
    )
  }

  getTokenStrava(){
    
    let bodyRequest={
      client_id:localStorage.getItem(CLIENT_ID_STRAVA),
      client_secret:localStorage.getItem(CLIENT_SECRET_STRAVA),
      code:this.code,
      grant_type:"authorization_code",
    }
    
    
    this.entrenamientosService.getTokenStrava(bodyRequest).subscribe(      
        respuesta => {  
          localStorage.setItem(TOKEN_STRAVA, respuesta.access_token) 
        },
        error => {
          if(error.status === 401){
            localStorage.clear()
            this.router.navigate(['/'])
          }else{
            this.mostrarErrorObtenerEntrenamientos = true
            if (error.error.description)
              this.errorObtenerEntrenamientos = error.error.description
            else
              this.errorObtenerEntrenamientos = "Error al autenticar con Strava";
          }
        }
    )
  }

  stravaAuth(): boolean{
    console.log(localStorage.getItem(TOKEN_KEY))
    if (localStorage.getItem(CLIENT_ID_STRAVA)=="null"){
      this.mostrarErrorObtenerEntrenamientos = true
      this.errorObtenerEntrenamientos = "El usuario no cuenta con configuración Strava"
      return false
    }else{
        return true
    }
  }

  stravaSync(){
    if(localStorage.getItem(TOKEN_STRAVA) != null){
      this.entrenamientosService.syncStrava(localStorage.getItem(TOKEN_STRAVA)).subscribe(      
        respuesta => {  
          this.mensajeExitoso="Sincronización de entrenamientos Strava ejecutada correctamente";
          this.exitoso=true

          setTimeout(() => {
            this.obtenerEntrenamientos();
            this.exitoso = false
          }, 2000);
          
        },
        error => {
          if(error.status === 401){
            localStorage.clear()
            this.router.navigate(['/'])
          }else{
            this.mostrarErrorObtenerEntrenamientos = true
            if (error.error.description)
              this.errorObtenerEntrenamientos = error.error.description
            else
              this.errorObtenerEntrenamientos = "Error al sincronizar con Strava";
          }
        }
    )
    } 
  }

  stravaEntrenamiento(idEntrenamiento: string){
    let bodyRequest={
      id_entrenamiento:idEntrenamiento,
      access_token:localStorage.getItem(TOKEN_STRAVA)
    }

    this.entrenamientosService.addActivityStrava(bodyRequest).subscribe(      
      respuesta => {  
        this.mensajeExitoso="Entrenamiento agregado a Strava correctamente";
          this.exitoso=true
          setTimeout(() => {
            this.exitoso = false
          }, 2000);
      },
      error => {
        if(error.status === 401){
          localStorage.clear()
          this.router.navigate(['/'])
        }else{
          this.mostrarErrorObtenerEntrenamientos = true
          if (error.error.description)
            this.errorObtenerEntrenamientos = error.error.description
          else
            this.errorObtenerEntrenamientos = "Error al agregar actividad a Strava";
        }
      }
  )

  }
}
