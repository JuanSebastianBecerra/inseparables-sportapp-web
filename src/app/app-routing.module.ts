import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './secciones/autenticacion/autenticacion.component';
import { HomeComponent } from './secciones/home/home.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';
import { RegistroComponent } from './secciones/usuarios/registro/registro.component';
import { SuscripcionesComponent } from './secciones/administracion/suscripciones/suscripciones.component';
import { SociosComponent } from './secciones/administracion/socios/socios.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent },
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'suscripciones', component: SuscripcionesComponent},
  { path: 'socios', component: SociosComponent},
  { path: '**', component: DesconocidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
