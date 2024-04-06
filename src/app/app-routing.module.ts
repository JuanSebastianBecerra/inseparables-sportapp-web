import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './secciones/autenticacion/autenticacion.component';
import { HomeComponent } from './secciones/home/home.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent },
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'home', component: HomeComponent},
  { path: '**', component: DesconocidoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
