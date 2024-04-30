import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DetalleEntrenamiento, RespuestaEntrenamientos } from 'src/app/clases/entrenamientos';
import { Plan, PlanesRespuesta } from 'src/app/clases/plan-entrenamiento';
import { PlanesService } from 'src/app/servicios/planes/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  planes: Plan[] = []
  planesDeportista: Plan[] = []
  entrenamientos: DetalleEntrenamiento[] = []
  entrenamientosDeportista: DetalleEntrenamiento[] = []
  errorResponse: boolean = false
  errorDescription: string = ""
  planAsociado : boolean = false
  planElegido: string = "todos"
  botonDeshabilitado: boolean = true

  constructor(private planesService: PlanesService, private router: Router){}

  ngOnInit(): void {
    this.consultarPlanes()
    this.consultarPlanesPorDeportista()
  }

  consultarPlanes() : void {
    this.planesService.obtenerPlanes().subscribe((respuesta) => {
      let planesRespuesta = new PlanesRespuesta(respuesta.respuesta, respuesta.token)
      planesRespuesta.setNuevoToken()
      this.planes = planesRespuesta.respuesta
      if (this.planes.length > 0){
        this.planes[0].selected = true
        this.consultarEntrenamientosPorPlan(this.planes[0].id, false)
        this.validarPlanAsignadoDeportista()
      }
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.errorResponse = true
        if (error.error.description)
          this.errorDescription = error.error.description
        else
          this.errorDescription = "Error al consultar la lista de planes, intente más tarde";
        }
    })
  }

  tienePlanSeleccionado(esDeportista: boolean): boolean {
    if(esDeportista) return this.planesDeportista.some(plan => plan.selected);
    return this.planes.some(plan => plan.selected);
  }

  consultarEntrenamientosPorPlan(idPlan: string, esDeportista: boolean) : void {
    this.planesService.obtenerEntrenamientosPorPlan(idPlan).subscribe((respuesta) => {
      let respuestaEntrenamientos = new RespuestaEntrenamientos(respuesta.respuesta, respuesta.token)
      respuestaEntrenamientos.setNuevoToken()
      if (esDeportista) this.entrenamientosDeportista = respuestaEntrenamientos.entrenamientos
      else this.entrenamientos = respuestaEntrenamientos.entrenamientos
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.errorResponse = true
        if (error.error.description)
          this.errorDescription = error.error.description
        else
          this.errorDescription = "Error al consultar la lista entrenamientos por plan, intente más tarde";
        }
    })
  }

  consultarPlanesPorDeportista(): void{
    this.planesService.obtenerPlanesPorDeportista().subscribe((respuesta) =>{
      let planesDeportistaRespuesta = new PlanesRespuesta(respuesta.respuesta, respuesta.token)
      planesDeportistaRespuesta.setNuevoToken()
      this.planesDeportista = planesDeportistaRespuesta.respuesta
      if (this.planesDeportista.length > 0){
        this.planesDeportista[0].selected = true
        this.consultarEntrenamientosPorPlan(this.planesDeportista[0].id, true)
        this.validarPlanAsignadoDeportista()
      }
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.errorResponse = true
        if (error.error.description)
          this.errorDescription = error.error.description
        else
          this.errorDescription = "Error al consultar la lista de planes por deportista, intente más tarde";
        }
    })
  }

  cambiarPlanSeleccionado(idPlan: string, esDeportista: boolean): void {
    if(esDeportista){
      this.planesDeportista.forEach((plan) => plan.selected = false)
      this.planesDeportista.forEach((plan) =>{
        if (plan.id == idPlan){
          plan.selected = true
        }
      })
    }else{
      this.planes.forEach((plan) => plan.selected = false)
      this.planes.forEach((plan) =>{
        if (plan.id == idPlan){
          plan.selected = true
        }
      })
    }
    this.consultarEntrenamientosPorPlan(idPlan, esDeportista)
  }

  asignarPlanDeportista(): void{
    let idPlan = this.planes.filter((plan) => plan.selected)
    this.planesService.asignarPlanDeportista(idPlan[0].id).subscribe((respuesta)=>{
      this.consultarPlanesPorDeportista()
      this.planAsociado = true;
      timer(2000).subscribe(x => {
        this.planAsociado = false;
    })
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.errorResponse = true
        if (error.error.description)
          this.errorDescription = error.error.description
        else
          this.errorDescription = "Error al asociar un plan al deportista, intente más tarde";
        }
    })
  }

  validarPlanAsignadoDeportista() : void{
    let planSeleccionado = this.planes.filter(plan => plan.selected)[0];
    this.botonDeshabilitado = false
    this.planesDeportista.forEach(planDeportista => {
      if (planDeportista.id == planSeleccionado.id){
        this.botonDeshabilitado = true
      }
    })
    
  }

  removerPlanDeportista() : void {
    let planSeleccionado = this.planes.filter(plan => plan.selected)[0];
    this.planesService.removerPlanDeportista(planSeleccionado.id).subscribe((respuesta) => {
      this.consultarPlanes()
      this.consultarPlanesPorDeportista()
    }, error => { 
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.errorResponse = true
        if (error.error.description)
          this.errorDescription = error.error.description
        else
          this.errorDescription = "Error al eliminar el servicio del deportista, intente más tarde";
        }
    })
  }

  cambiarTipoPlanAsignado() : void {
    this.validarPlanAsignadoDeportista()
  }
}
