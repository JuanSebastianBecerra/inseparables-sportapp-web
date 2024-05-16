import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionServiciosComponent } from './creacion-servicios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeportesService } from 'src/app/servicios/deporte/deportes.service';
import { of, throwError } from 'rxjs';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DetalleSocio, RespuestaSocios } from 'src/app/clases/detalle-socio';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { TranslateModule } from '@ngx-translate/core';

describe('CreacionServiciosComponent', () => {
  let component: CreacionServiciosComponent;
  let fixture: ComponentFixture<CreacionServiciosComponent>;
  let deportesService : DeportesService;
  let socioService : SocioService;
  let servicioService: ServiciosService;
  let router: Router

  const _DEPORTES_MOCK = [{"id": "1", "nombre": "Ciclismo"},{"id": "2", "nombre": "Atletismo"}]
  const _DETALLE_SOCIO = new DetalleSocio(1, "Socio", "Apellido", "Socio 1", "socio@socio.com", "CC", "124567890", "socio.socio", "1234567890");
  const _SOCIOS_RESPONSE = new RespuestaSocios([_DETALLE_SOCIO], "1234567890");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreacionServiciosComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: []
    });
    fixture = TestBed.createComponent(CreacionServiciosComponent);
    component = fixture.componentInstance;
    deportesService = TestBed.inject(DeportesService)
    socioService = TestBed.inject(SocioService)
    servicioService = TestBed.inject(ServiciosService)
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch deportes on initialization', () => {
    spyOn(deportesService, 'obtenerDeportes').and.returnValue(of({body: _DEPORTES_MOCK}))
    component.obtenerDeportes();
    expect(component.deportes).toEqual(_DEPORTES_MOCK);
  });

  it('should handle error from fetching deportes', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(deportesService, 'obtenerDeportes').and.returnValue(throwError(mockError))
    component.obtenerDeportes();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(deportesService, 'obtenerDeportes').and.returnValue(throwError(mockError))
    component.obtenerDeportes();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should fetch socios on initialization', () => {
    spyOn(socioService, 'getSocios').and.returnValue(of(_SOCIOS_RESPONSE))
    component.obtenerSocios();
    expect(component.socios).toEqual(_SOCIOS_RESPONSE.respuesta);
  });

  it('should handle error from fetching socios', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocios').and.returnValue(throwError(mockError))
    component.obtenerSocios();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching socios without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(socioService, 'getSocios').and.returnValue(throwError(mockError))
    component.obtenerSocios();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should handle authentication error from fetching socios', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocios').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should fetch guardar servicio', () => {
    spyOn(servicioService, 'registrarServicio').and.returnValue(of(_SOCIOS_RESPONSE))
    component.guardarServicio({});
    expect(component.exitoso).toBe(true);
  });

  it('should handle error from guardar servicio', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(servicioService, 'registrarServicio').and.returnValue(throwError(mockError))
    component.guardarServicio({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from guardar servicio without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(servicioService, 'registrarServicio').and.returnValue(throwError(mockError))
    component.guardarServicio({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

});
