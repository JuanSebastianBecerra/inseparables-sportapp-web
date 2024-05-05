import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEventoComponent } from './detalle-evento.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DetalleSocio, RespuestaSocio } from 'src/app/clases/detalle-socio';
import { of, throwError } from 'rxjs';
import { DeportesService } from 'src/app/servicios/deporte/deportes.service';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { Evento, RespuestaEvento } from 'src/app/clases/evento';
import { UbicacionMaps } from 'src/app/clases/location';
import { Router } from '@angular/router';

describe('DetalleEventoComponent', () => {
  let component: DetalleEventoComponent;
  let fixture: ComponentFixture<DetalleEventoComponent>;
  let sociosService: SocioService
  let deporteService: DeportesService
  let eventosService: EventosService
  let router: Router

  const _DETALLE_SOCIO = new DetalleSocio(1, "Socio", "Apellido", "Socio 1", "socio@socio.com", "CC", "124567890", "socio.socio", "1234567890");
  const _SOCIOS_RESPONSE = new RespuestaSocio(_DETALLE_SOCIO, "1234567890");
  const _DEPORTES_MOCK = [{"id": "1", "nombre": "Ciclismo"},{"id": "2", "nombre": "Atletismo"}]
  const _UBICACION = new UbicacionMaps("1", "Calle", "1", "1", "Calle")
  const _EVENTO = new Evento("1", "evento", "2025-02-01", "3035-03-01", "Detalle eventos", "1", "1", _UBICACION)
  const _RESPUESTA_EVENTO = new RespuestaEvento(_EVENTO, "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEventoComponent],
      imports: [AppRoutingModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DetalleEventoComponent);
    sociosService = TestBed.inject(SocioService)
    deporteService = TestBed.inject(DeportesService)
    eventosService = TestBed.inject(EventosService)
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtener socio', () => {
    spyOn(sociosService, 'getSocioId').and.returnValue(of(_SOCIOS_RESPONSE))
    component.obtenerInfoSocio("1")
    expect(component.nombreSocio).toEqual(_DETALLE_SOCIO.nombre + " " + _DETALLE_SOCIO.apellido)
  });

  it('should obtener deporte', () => {
    spyOn(deporteService, 'obtenerDeportes').and.returnValue(of({body: _DEPORTES_MOCK}))
    component.obtenerDeportes("1")
    expect(component.nombreDeporte).toEqual(_DEPORTES_MOCK[0].nombre)
  });

  it('should obtener detalle evento', () => {
    spyOn(eventosService, 'getDetalleEvento').and.returnValue(of(_RESPUESTA_EVENTO))
    component.obtenerDetalleEvento()
    expect(component.eventoDetalle.id).toEqual(_EVENTO.id)
  });

  it('should handle error from fetching detalle eventos', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(eventosService, 'getDetalleEvento').and.returnValue(throwError(mockError))
    component.obtenerDetalleEvento();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching detalle eventos without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(eventosService, 'getDetalleEvento').and.returnValue(throwError(mockError))
    component.obtenerDetalleEvento();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error al consultar el detalle del evento, intente más tarde');
  });

  it('should handle authentication error from fetching detalle eventos', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(eventosService, 'getDetalleEvento').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
