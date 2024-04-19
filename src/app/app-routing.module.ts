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
  { path: 'perfil-deportista', component: PerfilDeportistaComponent},
  { path: '**', component: DesconocidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
