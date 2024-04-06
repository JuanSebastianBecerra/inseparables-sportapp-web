import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacionComponent } from './secciones/autenticacion/autenticacion.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './secciones/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DesconocidoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AutenticacionComponent,
    AppRoutingModule,
    HttpClientModule,
      ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
