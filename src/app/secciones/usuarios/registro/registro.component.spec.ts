import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import {AppRoutingModule} from "../../../app-routing.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdministracionService } from 'src/app/servicios/administracion/administracion.service';
import { of, throwError } from 'rxjs';
import { CacheService } from 'src/app/servicios/administracion/cache.service';
import { PersonasService } from 'src/app/servicios/personas/personas.service';
import { LocationService } from 'src/app/servicios/maps/location.service';
import { UbicacionMaps } from 'src/app/clases/location';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let administracionService : AdministracionService;
  let cacheService : CacheService
  let personasService : PersonasService
  let locationService : LocationService

  const _PLANES = [
    {"nombre": "Plan básico", "funciones": "Funciones básicas", "id":"1", "llave":"BASICO", "valor_mensual": 100},
    {"nombre": "Plan intermedio", "funciones": "Funciones intermedias", "id":"2", "llave":"INTERMEDIO", "valor_mensual": 200},
    {"nombre": "Plan premium", "funciones": "Funciones premium", "id":"3", "llave":"PREMIUM", "valor_mensual": 300}
  ]

  const _PLACES = [
    {"id": "1", "formattedAddress": "Calle 134", "location": {"latitude": "1", "longitude": "1"}, "displayName": {"text": "direccion"}}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [],
      providers: [],
    });
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    administracionService = TestBed.inject(AdministracionService);
    cacheService = TestBed.inject(CacheService);
    personasService = TestBed.inject(PersonasService)
    locationService = TestBed.inject(LocationService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch planes', () => {
    spyOn(administracionService, 'obtenerPlanes').and.returnValue(of({body: _PLANES}))
    component.obtenerPlanes();
    expect(component.planes).toEqual(_PLANES);
  });

  it('should handle error from fetching pkanes', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(administracionService, 'obtenerPlanes').and.returnValue(throwError(mockError))
    component.obtenerPlanes();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(administracionService, 'obtenerPlanes').and.returnValue(throwError(mockError))
    component.obtenerPlanes();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should show error without perfil deportivo', () => {
    spyOn(cacheService, 'get').and.returnValue(undefined)
    component.registrarUsuario({});
    expect(component.mostrarErrorPerfilDeportivo).toBe(true);
  });

  it('should save pefil', () => {
    spyOn(cacheService, 'get').and.returnValue({})
    spyOn(personasService, 'registrarUsuario').and.returnValue(of({"body": {"id":"1"}}));
    spyOn(personasService, 'registrarPerfilDeportivo').and.returnValue(of({}));
    component.registrarUsuario({});
    expect(component.mostrarErrorPerfilDeportivo).toBe(false);
    expect(component.mostrarUsuarioRegistrado).toBe(true);
  });

  it('should save pefil with error', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };

    spyOn(cacheService, 'get').and.returnValue({})
    spyOn(personasService, 'registrarUsuario').and.returnValue(throwError(mockError));
    component.registrarUsuario({});

    expect(component.mostrarErrorPerfilDeportivo).toBe(false);
    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should save pefil with error without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };

    spyOn(cacheService, 'get').and.returnValue({})
    spyOn(personasService, 'registrarUsuario').and.returnValue(throwError(mockError));
    component.registrarUsuario({});

    expect(component.mostrarErrorPerfilDeportivo).toBe(false);
    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al guardar el usuario');
  });

  it('should save pefil deportivo with error', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };

    spyOn(cacheService, 'get').and.returnValue({})
    spyOn(personasService, 'registrarUsuario').and.returnValue(of({"body": {"id":"1"}}));
    spyOn(personasService, 'registrarPerfilDeportivo').and.returnValue(throwError(mockError));
    component.registrarUsuario({});
    expect(component.mostrarErrorPerfilDeportivo).toBe(false);
    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should save pefil with error without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };

    spyOn(cacheService, 'get').and.returnValue({})
    spyOn(personasService, 'registrarUsuario').and.returnValue(of({"body": {"id":"1"}}));
    spyOn(personasService, 'registrarPerfilDeportivo').and.returnValue(throwError(mockError));

    component.registrarUsuario({});

    expect(component.mostrarErrorPerfilDeportivo).toBe(false);
    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al guardar el perfil deportivo');
  });

  it('should fetch cargar direccion', () => {
    let mockPlace = new UbicacionMaps("1", "Calle", "1", "1", "Calle")
    component.seleccionarDireccion(mockPlace)
    expect(component.places.length).toBe(0);
    spyOn(locationService, 'obtenerUbicacionesPorNombre').and.returnValue(of({"places": _PLACES}))
    component.buscarDireccion();
    expect(component.places.length).toBeGreaterThan(0);
  });

})

