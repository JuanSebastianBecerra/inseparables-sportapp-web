import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEventosComponent } from './listar-eventos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { Evento, RespuestaEventos } from 'src/app/clases/evento';
import { UbicacionMaps, DireccionDeportista } from 'src/app/clases/location';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DeportistasService } from 'src/app/servicios/deportista/deportistas.service';
import { PersonasService } from 'src/app/servicios/personas/personas.service';

describe('ListarEventosComponent', () => {
  let component: ListarEventosComponent;
  let fixture: ComponentFixture<ListarEventosComponent>;
  let eventosServicio: EventosService
  let deportistasService : DeportistasService
  let personasService: PersonasService
  let router: Router

  const _UBICACION = new UbicacionMaps("1", "Calle", "1", "1", "Calle")
  const _UBICACIONES = new DireccionDeportista("1", "Calle", "1", "1", "Calle")
  const _EVENTO = new Evento("1", "evento", "2025-02-01", "3035-03-01", "Detalle eventos", "1", "1", _UBICACION)
  const _RESPUESTA_EVENTOS = new RespuestaEventos([_EVENTO], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ListarEventosComponent, ReactiveFormsModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ListarEventosComponent);
    eventosServicio = TestBed.inject(EventosService)
    deportistasService = TestBed.inject(DeportistasService)
    personasService = TestBed.inject(PersonasService)
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get eventos proximos', () => {
    spyOn(eventosServicio, 'getEventosProximos').and.returnValue(of(_RESPUESTA_EVENTOS))
    component.getEventosProximos();
    expect(component.eventosProximos).toEqual([_EVENTO]);
  });

  it('should handle error from fetching eventos proximos', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(eventosServicio, 'getEventosProximos').and.returnValue(throwError(mockError))
    component.getEventosProximos();

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error occurred');
  });

  it('should handle error from fetching eventos proximos without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(eventosServicio, 'getEventosProximos').and.returnValue(throwError(mockError))
    component.getEventosProximos();

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error al consultar la lista de eventos próximos, intente más tarde');
  });

  it('should handle authentication error from fetching eventos proximos', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(eventosServicio, 'getEventosProximos').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.getEventosProximos();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should get eventos cercanos', () => {
    spyOn(personasService, 'getDireccionUsuario').and.returnValue(of(_UBICACIONES))
    spyOn(eventosServicio, 'getEventosCercanos').and.returnValue(of(_RESPUESTA_EVENTOS))
    component.getEventosCercanos();
    expect(component.eventosCercanos).toEqual([_EVENTO]);
  });

  it('should handle error from fetching eventos cercanos', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(personasService, 'getDireccionUsuario').and.returnValue(of(_UBICACIONES))
    spyOn(eventosServicio, 'getEventosCercanos').and.returnValue(throwError(mockError))
    component.getEventosCercanos();

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error occurred');
  });

  it('should handle error from fetching eventos cercanos without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(personasService, 'getDireccionUsuario').and.returnValue(of(_UBICACIONES))
    spyOn(eventosServicio, 'getEventosCercanos').and.returnValue(throwError(mockError))
    component.getEventosCercanos();

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error al consultar la lista de eventos cercanos, intente más tarde');
  });

  it('should handle authentication error from fetching eventos cercanos', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(personasService, 'getDireccionUsuario').and.returnValue(of(_UBICACIONES))
    spyOn(eventosServicio, 'getEventosCercanos').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.getEventosCercanos();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should get eventos deportista', () => {
    spyOn(eventosServicio, 'getEventosDeportista').and.returnValue(of(_RESPUESTA_EVENTOS))
    component.getEventosDeportista();
    expect(component.eventosDeportista).toEqual([_EVENTO]);
  });

  it('should handle error from fetching eventos deportista', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(eventosServicio, 'getEventosDeportista').and.returnValue(throwError(mockError))
    component.getEventosDeportista();

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error occurred');
  });

  it('should handle error from fetching eventos deportista without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(eventosServicio, 'getEventosDeportista').and.returnValue(throwError(mockError))
    component.getEventosDeportista();

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error al consultar la lista de eventos del deportista, intente más tarde');
  });

  it('should handle authentication error from fetching eventos deportista', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(eventosServicio, 'getEventosDeportista').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.getEventosDeportista();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should assign event to user', () =>{
    spyOn(deportistasService, 'asignarEventoAgendaDeportista').and.returnValue(of({"body": "some"}))
    component.registarEventoAgendaDeportista("idServicio");
    expect(component.asignacionExitosa).toBeTrue()
  });

  it('should handle error from assign event to user', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(deportistasService, 'asignarEventoAgendaDeportista').and.returnValue(throwError(mockError))
    component.registarEventoAgendaDeportista("idServicio");
    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error occurred');
  });

  //

  it('should eliminar eventos agenda', () => {
    spyOn(eventosServicio, 'getEventosDeportista').and.returnValue(of(_RESPUESTA_EVENTOS))
    spyOn(deportistasService, 'eliminarEventoAgendaDeportista').and.returnValue(of({}))
    component.eliminarEventoAgendaDeportista("1");
    expect(component.eventosDeportista).toEqual([_EVENTO]);
  });

  it('should handle error from fetching eliminar eventos agenda', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(deportistasService, 'eliminarEventoAgendaDeportista').and.returnValue(throwError(mockError))
    component.eliminarEventoAgendaDeportista("1");

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error occurred');
  });

  it('should handle error from fetching eventos deportista without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(deportistasService, 'eliminarEventoAgendaDeportista').and.returnValue(throwError(mockError))
    component.eliminarEventoAgendaDeportista("1");

    expect(component.mostrarError).toBe(true);
    expect(component.errorMensaje).toBe('Error al eliminar el evento de la agenda del deportista, intente más tarde');
  });

  it('should handle authentication error from fetching eventos deportista', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(deportistasService, 'eliminarEventoAgendaDeportista').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.eliminarEventoAgendaDeportista("1");

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
