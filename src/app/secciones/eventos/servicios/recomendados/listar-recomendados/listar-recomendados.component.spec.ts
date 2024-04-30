import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecomendadosComponent } from './listar-recomendados.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosRecomendadosService } from 'src/app/servicios/eventos/servicios-recomendados.service';
import { RespuestaServiciosRecomendados } from 'src/app/clases/detalle-servicio-recomendado';
import { Servicio } from 'src/app/clases/servicio';
import { of, throwError } from 'rxjs';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DetalleSocio, RespuestaSocio } from 'src/app/clases/detalle-socio';
import { DeportistasService } from 'src/app/servicios/deportista/deportistas.service';

describe('ListarRecomendadosComponent', () => {
  let component: ListarRecomendadosComponent;
  let fixture: ComponentFixture<ListarRecomendadosComponent>;
  let serviciosRecomendadosService: ServiciosRecomendadosService;
  let socioService: SocioService
  let deportistasService: DeportistasService
  let router: Router

  const mockParamMap = jasmine.createSpyObj('ParamMap', ['get']);
  mockParamMap.get.and.returnValue('idEvento');

  const mockSnapshot = jasmine.createSpyObj('Snapshot', ['paramMap']);
  mockSnapshot.paramMap = mockParamMap;

  const mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  mockActivatedRoute.snapshot = mockSnapshot;

  const _SERVICIO = new Servicio("Servicio descripcion 1", "Servicio detalle 1", "1", "1", "1", "", "Servicio 1", 30);
  const _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE = new RespuestaServiciosRecomendados([_SERVICIO], "134567890");

  const _DETALLE_SOCIO = new DetalleSocio(1, "Socio", "Apellido", "Socio 1", "socio@socio.com", "CC", "124567890", "socio.socio", "1234567890");
  const _SOCIO_RESPONSE = new RespuestaSocio(_DETALLE_SOCIO, "1234567890");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ListarRecomendadosComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    });
    fixture = TestBed.createComponent(ListarRecomendadosComponent);
    component = fixture.componentInstance;
    serviciosRecomendadosService = TestBed.inject(ServiciosRecomendadosService);
    socioService = TestBed.inject(SocioService)
    deportistasService = TestBed.inject(DeportistasService)
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch servicios recomendados on initialization', () => {
    spyOn(serviciosRecomendadosService, 'getServiciosRecomendadosPorEvento').and.callFake((eventIdParam: string) => {
      return of(_SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE);
    });
    component.ngOnInit();
    expect(component.serviciosRecomendados).toEqual(_SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta);
  });

  it('should handle authentication error from fetching servicios recomendados', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(serviciosRecomendadosService, 'getServiciosRecomendadosPorEvento').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });


  it('should handle error from fetching servicios recomendados', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(serviciosRecomendadosService, 'getServiciosRecomendadosPorEvento').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorGetServiciosRecomendados).toBe(true);
    expect(component.errorGetServiciosRecomendados).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(serviciosRecomendadosService, 'getServiciosRecomendadosPorEvento').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorGetServiciosRecomendados).toBe(true);
    expect(component.errorGetServiciosRecomendados).toBe('Error al consultar la lista de servicios recomendados, intente más tarde');
  });

  it('should get information socio', async () =>{
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta
    spyOn(socioService, 'getSocioId').and.returnValue(of(_SOCIO_RESPONSE))
    component.getInformacionSocio(component.serviciosRecomendados[0]);
    expect(component.serviciosRecomendados[0].nombre_socio).toEqual(_DETALLE_SOCIO.nombre + " " + _DETALLE_SOCIO.apellido)
  });

  it('should handle authentication error from fetching socio info', () => {
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocioId').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.getInformacionSocio(component.serviciosRecomendados[0]);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
  
  it('should handle error from fetching socio info', () => {
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocioId').and.returnValue(throwError(mockError));

    component.getInformacionSocio(component.serviciosRecomendados[0]);

    expect(component.mostrarErrorGetServiciosRecomendados).toBe(true);
    expect(component.errorGetServiciosRecomendados).toBe('Error occurred');
  });

  it('should handle error from fetching socio info without description', () => {
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta

    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(socioService, 'getSocioId').and.returnValue(throwError(mockError));

    component.getInformacionSocio(component.serviciosRecomendados[0]);

    expect(component.mostrarErrorGetServiciosRecomendados).toBe(true);
    expect(component.errorGetServiciosRecomendados).toBe('Error al consultar el detalle del socio, intente más tarde');
  });
  
  it('should solicitar evento', () =>{
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta
    spyOn(deportistasService, 'asignarServicioADeportista').and.returnValue(of({"body": "some"}))
    component.solicitarEvento("idServicio");
    expect(component.asignacionExitosa).toBeTrue()
  });

  it('should handle authentication error from solicitar evento', () => {
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(deportistasService, 'asignarServicioADeportista').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.solicitarEvento("idServicio");

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
  
  it('should handle error from fetching asignando evento info', () => {
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(deportistasService, 'asignarServicioADeportista').and.returnValue(throwError(mockError));

    component.solicitarEvento("idServicio");

    expect(component.mostrarErrorGetServiciosRecomendados).toBe(true);
    expect(component.errorGetServiciosRecomendados).toBe('Error occurred');
  });

  it('should handle error from fetching asignado evento info without description', () => {
    component.serviciosRecomendados = _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE.respuesta

    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(deportistasService, 'asignarServicioADeportista').and.returnValue(throwError(mockError));

    component.solicitarEvento("idServicio");

    expect(component.mostrarErrorGetServiciosRecomendados).toBe(true);
    expect(component.errorGetServiciosRecomendados).toBe('Error al asignar el serivicio al deportista, intente más tarde');
  });

});
