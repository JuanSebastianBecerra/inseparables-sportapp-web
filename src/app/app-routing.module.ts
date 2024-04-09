import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';
import { RegistroComponent } from './usuarios/registro/registro.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent },
  { path: 'autenticacion', component: AutenticacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', component: DesconocidoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
