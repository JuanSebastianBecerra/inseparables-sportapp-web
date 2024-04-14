import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DesconocidoComponent } from './comunes/componentes/desconocido/desconocido.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './secciones/home/home.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RegistroComponent } from './secciones/usuarios/registro/registro.component';
import { AutenticacionComponent } from './secciones/autenticacion/autenticacion.component';
import { SuscripcionesComponent } from './secciones/administracion/suscripciones/suscripciones.component';
import { PerfilDeportistaComponent } from './secciones/usuarios/perfil-deportista/perfil-deportista.component';
import { StoreModule } from '@ngrx/store';
import {perfilDeportivoReducer} from "./store/secciones/usuarios/perfil-deportivo.reducer";

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DesconocidoComponent,
    HomeComponent,
    SuscripcionesComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    AutenticacionComponent,
    RegistroComponent,
    PerfilDeportistaComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({
      perfil: perfilDeportivoReducer
    }, {})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
