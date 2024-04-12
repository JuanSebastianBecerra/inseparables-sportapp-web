import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './secciones/autenticacion/autenticacion.component';
import { HomeComponent } from './secciones/home/home.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';
import { RegistroComponent } from './secciones/usuarios/registro/registro.component';
import { SocioComponent } from './secciones/socios/socio/socio.component';
import { DetalleSocioComponent } from './secciones/socios/detalleSocio/detalleSocio.component';
import { ConsultaSocioComponent } from './secciones/socios/consultaSocio/consultaSocio.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent },
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent},
  { path: 'socios', component: ConsultaSocioComponent},
  { path: 'socio', component: SocioComponent },
  { path: 'socio/:idSocio', component: DetalleSocioComponent},
  { path: '**', component: DesconocidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
