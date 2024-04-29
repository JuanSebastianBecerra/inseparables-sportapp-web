import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './secciones/autenticacion/autenticacion.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';
import { RegistroComponent } from './secciones/usuarios/registro/registro.component';
import { SuscripcionesComponent } from './secciones/administracion/suscripciones/suscripciones.component';
import { SociosComponent } from './secciones/administracion/socios/socios.component';
import { SocioComponent } from './secciones/socios/socio/socio.component';
import { DetalleSocioComponent } from './secciones/socios/detalleSocio/detalleSocio.component';
import { CreacionServiciosComponent } from './secciones/servicios/creacion-servicios/creacion-servicios.component';
import { PerfilDeportistaComponent } from './secciones/usuarios/perfil-deportista/perfil-deportista.component';
import { ConsultaServiciosComponent } from './secciones/servicios/consulta-servicios/consulta-servicios.component';
import { DetalleServicioComponent } from './secciones/servicios/detalle-servicio/detalle-servicio.component';
import { RecomendadosComponent as ServiciosRecomendadosComponent } from './secciones/eventos/servicios/recomendados/recomendados.component';
import { ConsultarReunionesComponent } from './secciones/reuniones/consultar-reuniones/consultar-reuniones.component';
import { EntrenamientosComponent} from "./secciones/entrenamientos/entrenamientos.component";
import { CrearEntrenamientoComponent } from "./secciones/entrenamientos/crear-entrenamiento/crear-entrenamiento.component";
import { PlanesComponent } from './secciones/planes/planes.component';
import { EventosComponent } from './secciones/eventos/eventos.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent },
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'suscripciones', component: SuscripcionesComponent},
  { path: 'socios', component: SociosComponent},
  { path: 'socio', component: SocioComponent },
  { path: 'socio/:idSocio', component: DetalleSocioComponent},
  { path: 'crear-servicio', component: CreacionServiciosComponent},
  { path: 'servicios/:idServicio', component: DetalleServicioComponent},
  { path: 'servicios', component: ConsultaServiciosComponent},
  { path: 'entrenamientos', component: EntrenamientosComponent},
  { path: 'entrenamientos/crear-entrenamiento', component: CrearEntrenamientoComponent},
  { path: 'perfil-deportista', component: PerfilDeportistaComponent},
  { path: 'eventos', component: EventosComponent}, // TODO: asociar el componente correcto de la historia SPR-60 (lista de eventos)
  { path: 'eventos/:idEvento', component: DesconocidoComponent},// TODO: asociar el componente correcto de la historia SPR-60 (detalle del evento)
  { path: 'eventos/:idEvento/servicios', component: ServiciosRecomendadosComponent},
  { path: 'reuniones/disponibles', component: ConsultarReunionesComponent },
  { path: 'planes', component: PlanesComponent},
  { path: '**', component: DesconocidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
