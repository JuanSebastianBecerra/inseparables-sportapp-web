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
import { MenuComponent } from './comunes/componentes/menu/menu.component';
import { SociosComponent } from './secciones/administracion/socios/socios.component';
import { SocioComponent } from './secciones/socios/socio/socio.component';
import { ConsultaSocioComponent } from './secciones/socios/consultaSocio/consultaSocio.component';
import { DetalleSocioComponent } from './secciones/socios/detalleSocio/detalleSocio.component';
import { CreacionServiciosComponent } from './secciones/servicios/creacion-servicios/creacion-servicios.component';

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
    SociosComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    AutenticacionComponent,
    RegistroComponent,
    SocioComponent,
    ConsultaSocioComponent,
    DetalleSocioComponent,
    CreacionServiciosComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
