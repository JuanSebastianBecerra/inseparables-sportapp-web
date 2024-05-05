import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DesconocidoComponent} from './comunes/componentes/desconocido/desconocido.component';
import {CommonModule} from '@angular/common';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {RegistroComponent} from './secciones/usuarios/registro/registro.component';
import {AutenticacionComponent} from './secciones/autenticacion/autenticacion.component';
import {SuscripcionesComponent} from './secciones/administracion/suscripciones/suscripciones.component';
import {MenuComponent} from './comunes/componentes/menu/menu.component';
import {SociosComponent} from './secciones/administracion/socios/socios.component';
import {SocioComponent} from './secciones/socios/socio/socio.component';
import {ListaSociosComponent} from './secciones/socios/listaSocios/listaSocios.component';
import {DetalleSocioComponent} from './secciones/socios/detalleSocio/detalleSocio.component';
import {CreacionServiciosComponent} from './secciones/servicios/creacion-servicios/creacion-servicios.component';
import {PerfilDeportistaComponent} from './secciones/usuarios/perfil-deportista/perfil-deportista.component';
import {BodyComponent} from './secciones/body/body.component';
import {BuscarSocioComponent} from './secciones/socios/buscar-socio/buscar-socio.component';
import {MenuAgregarSocioComponent} from './secciones/socios/menu-agregar-socio/menu-agregar-socio.component';
import {ToastComponent} from './comunes/componentes/toast/toast.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ConsultaServiciosComponent} from './secciones/servicios/consulta-servicios/consulta-servicios.component';
import {BuscarServicioComponent} from './secciones/servicios/buscar-servicio/buscar-servicio.component';
import {ListarServicioComponent} from './secciones/servicios/listar-servicio/listar-servicio.component';
import {
    MenuAgregarServicioComponent
} from './secciones/servicios/menu-agregar-servicio/menu-agregar-servicio.component';
import {DetalleServicioComponent} from './secciones/servicios/detalle-servicio/detalle-servicio.component';
import {RecomendadosComponent} from './secciones/eventos/servicios/recomendados/recomendados.component';
import {
    BuscarRecomendadosComponent
} from './secciones/eventos/servicios/recomendados/buscar-recomendados/buscar-recomendados.component';
import {
    ListarRecomendadosComponent
} from './secciones/eventos/servicios/recomendados/listar-recomendados/listar-recomendados.component';
import {
    ReunionesDisponiblesComponent
} from './secciones/reuniones/reuniones-dispobibles/reuniones-disponibles.component';
import {BuscarReunionesComponent} from './secciones/reuniones/buscar-reuniones/buscar-reuniones.component';
import {ConsultarReunionesComponent} from './secciones/reuniones/consultar-reuniones/consultar-reuniones.component';
import {
    ListaEntrenamientosComponent
} from './secciones/entrenamientos/lista-entrenamientos/lista-entrenamientos.component';
import { BuscarEntrenamientoComponent } from './secciones/entrenamientos/buscar-entrenamiento/buscar-entrenamiento.component';
import { EntrenamientosComponent } from './secciones/entrenamientos/entrenamientos.component';
import { CrearEntrenamientoComponent } from './secciones/entrenamientos/crear-entrenamiento/crear-entrenamiento.component';
import {CrearPlanComponent} from './secciones/planes_entrenamiento/crear-plan/crear-plan.component';
import { PlanesComponent } from './secciones/planes/planes.component';
import { IdiomaComponent } from './comunes/componentes/idioma/idioma.component';
import { IndicadoresComponent } from './secciones/indicadores/indicadores.component';
import { CrearEventoComponent } from './secciones/eventos/crear-evento/crear-evento.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ConsultaEventosComponent } from './secciones/eventos/consulta-eventos/consulta-eventos.component';
import { BuscarEventosComponent } from './secciones/eventos/buscar-eventos/buscar-eventos.component';
import { ListarEventosComponent } from './secciones/eventos/listar-eventos/listar-eventos.component';
import { BotonCrearEventoComponent } from './secciones/eventos/boton-crear-evento/boton-crear-evento.component';
import { UbicacionComponent } from './comunes/componentes/ubicacion/ubicacion.component'

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        DesconocidoComponent,
        SuscripcionesComponent,
        MenuComponent,
        SociosComponent,
        BodyComponent,
        BuscarSocioComponent,
        MenuAgregarSocioComponent,
        ConsultaServiciosComponent,
        BuscarServicioComponent,
        ListarServicioComponent,
        MenuAgregarServicioComponent,
        RecomendadosComponent,
        BuscarRecomendadosComponent,
        ReunionesDisponiblesComponent,
        ConsultarReunionesComponent,
        BuscarReunionesComponent,
        BuscarEntrenamientoComponent,
        EntrenamientosComponent,
        PlanesComponent,
        IdiomaComponent,
        IndicadoresComponent,
        ConsultaEventosComponent,
        BotonCrearEventoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        AutenticacionComponent,
        RegistroComponent,
        SocioComponent,
        ListaSociosComponent,
        DetalleSocioComponent,
        CreacionServiciosComponent,
        PerfilDeportistaComponent,
        DetalleServicioComponent,
        ListarRecomendadosComponent,
        ListaEntrenamientosComponent,
        CrearEntrenamientoComponent,
        ToastComponent,
        CrearPlanComponent,
        CrearEventoComponent,
        NgxMaterialTimepickerModule,
        BuscarEventosComponent,
        ListarEventosComponent,
        UbicacionComponent,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [AppComponent],
    exports: [
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
