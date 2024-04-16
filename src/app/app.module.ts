import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

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
import { MenuComponent } from './comunes/componentes/menu/menu.component';
import { SociosComponent } from './secciones/administracion/socios/socios.component';
import { SocioComponent } from './secciones/socios/socio/socio.component';
import { ListaSociosComponent } from './secciones/socios/listaSocios/listaSocios.component';
import { DetalleSocioComponent } from './secciones/socios/detalleSocio/detalleSocio.component';
import { CreacionServiciosComponent } from './secciones/servicios/creacion-servicios/creacion-servicios.component';
import { PerfilDeportistaComponent } from './secciones/usuarios/perfil-deportista/perfil-deportista.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from "./store/app.state";
import { BodyComponent } from './secciones/body/body.component';
import { BuscarSocioComponent } from './secciones/socios/buscar-socio/buscar-socio.component';
import { MenuAgregarSocioComponent } from './secciones/socios/menu-agregar-socio/menu-agregar-socio.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DesconocidoComponent,
    HomeComponent,
    SuscripcionesComponent,
    MenuComponent,
    SociosComponent,
    BodyComponent,
    BuscarSocioComponent,
    MenuAgregarSocioComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutenticacionComponent,
    RegistroComponent,
    SocioComponent,
    ListaSociosComponent,
    DetalleSocioComponent,
    CreacionServiciosComponent,
    PerfilDeportistaComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(ROOT_REDUCERS, {})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
