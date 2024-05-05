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
import { CrearPlanComponent } from './secciones/planes_entrenamiento/crear-plan/crear-plan.component';
import { EntrenamientosComponent} from "./secciones/entrenamientos/entrenamientos.component";
import { CrearEntrenamientoComponent } from "./secciones/entrenamientos/crear-entrenamiento/crear-entrenamiento.component";
import { PlanesComponent } from './secciones/planes/planes.component';
import { IndicadoresComponent } from './secciones/indicadores/indicadores.component';
import { CrearEventoComponent } from './secciones/eventos/crear-evento/crear-evento.component';
import { ConsultaEventosComponent } from './secciones/eventos/consulta-eventos/consulta-eventos.component';
import { DetalleEventoComponent } from './secciones/eventos/detalle-evento/detalle-evento.component';

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
  { path: 'eventos', component: ConsultaEventosComponent},
  { path: 'eventos/:idEvento', component: DetalleEventoComponent},
  { path: 'eventos/:idEvento/servicios', component: ServiciosRecomendadosComponent},
  { path: 'reuniones/disponibles', component: ConsultarReunionesComponent },
  { path: 'crear-plan', component: CrearPlanComponent},
  { path: 'planes', component: PlanesComponent},
  { path: 'indicadores', component: IndicadoresComponent},
  { path: 'crear-evento', component: CrearEventoComponent},
  { path: '**', component: DesconocidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
