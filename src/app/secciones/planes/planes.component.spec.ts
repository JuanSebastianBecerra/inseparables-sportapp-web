import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesComponent } from './planes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { FormsModule } from '@angular/forms';
import { PlanesService } from 'src/app/servicios/planes/planes.service';
import { Plan, PlanesEntrenamientoRespuesta, PlanesRespuesta } from 'src/app/clases/plan-entrenamiento';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DetalleEntrenamiento } from 'src/app/clases/entrenamientos';

describe('PlanesComponent', () => {
  let component: PlanesComponent;
  let fixture: ComponentFixture<PlanesComponent>;
  let planesService: PlanesService
  let router: Router

  const _PLAN = new Plan("1", "Plan 1", "1")
  const _PLANES_RESPONSE = new PlanesRespuesta([_PLAN], "1234567890")

  const _DETALLE_ENTRENAMIENTO = [new DetalleEntrenamiento("1", "Entrenamiento 1", "00:00", "23:59", "Bogotá", "MENSUAL", "Entrenamiento Detalle 1", "1")]
  const _PLANES_ENTRENAMIENTOS_RESPONSE = new PlanesEntrenamientoRespuesta(_DETALLE_ENTRENAMIENTO, "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanesComponent],
      imports: [HttpClientTestingModule,ToastComponent, FormsModule]
    });
    fixture = TestBed.createComponent(PlanesComponent);
    component = fixture.componentInstance;
    planesService = TestBed.inject(PlanesService)
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch planes on initialization', () => {
    spyOn(planesService, 'obtenerPlanes').and.returnValue(of(_PLANES_RESPONSE));
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(of(_PLANES_RESPONSE));
    component.ngOnInit();
    expect(component.planesDeportista).toEqual(_PLANES_RESPONSE.respuesta);
    expect(component.planes).toEqual(_PLANES_RESPONSE.respuesta);
  });

  it('should handle authentication error from fetching planes', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(planesService, 'obtenerPlanes').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.consultarPlanes();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });


  it('should handle error from fetching planes', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(planesService, 'obtenerPlanes').and.returnValue(throwError(mockError));

    component.consultarPlanes();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(planesService, 'obtenerPlanes').and.returnValue(throwError(mockError));

    component.consultarPlanes();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error al consultar la lista de planes, intente más tarde');
  });

  it('should handle authentication error from fetching planes deportista', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.consultarPlanesPorDeportista();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from fetching planes deportista', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(throwError(mockError));

    component.consultarPlanesPorDeportista();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error occurred');
  });

  it('should handle error from fetching planes deportista without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(throwError(mockError));

    component.consultarPlanesPorDeportista();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error al consultar la lista de planes por deportista, intente más tarde');
  });

  it('should fetch entrenamientos por plan', () => {
    spyOn(planesService, 'obtenerEntrenamientosPorPlan').and.returnValue(of(_PLANES_ENTRENAMIENTOS_RESPONSE));
    component.consultarEntrenamientosPorPlan("idPlan", true);
    expect(component.entrenamientosDeportista).toEqual(_PLANES_ENTRENAMIENTOS_RESPONSE.respuesta);
    component.consultarEntrenamientosPorPlan("idPlan", false);
    expect(component.entrenamientos).toEqual(_PLANES_ENTRENAMIENTOS_RESPONSE.respuesta);
  });

  it('should handle authentication error from fetching entrenamientos por plan', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(planesService, 'obtenerEntrenamientosPorPlan').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.consultarEntrenamientosPorPlan("idPlan", true);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from fetching entrenamientos por plan', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(planesService, 'obtenerEntrenamientosPorPlan').and.returnValue(throwError(mockError));

    component.consultarEntrenamientosPorPlan("idPlan", true);

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error occurred');
  });

  it('should handle error from fetching entrenamientos por plan without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(planesService, 'obtenerEntrenamientosPorPlan').and.returnValue(throwError(mockError));

    component.consultarEntrenamientosPorPlan("idPlan", true);

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error al consultar la lista entrenamientos por plan, intente más tarde');
  });

  it('should validate selected plan', () => {
    spyOn(planesService, 'obtenerPlanes').and.returnValue(of(_PLANES_RESPONSE));
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(of(_PLANES_RESPONSE));
    component.ngOnInit();
    expect(component.planesDeportista).toEqual(_PLANES_RESPONSE.respuesta);
    expect(component.planes).toEqual(_PLANES_RESPONSE.respuesta);
    expect(component.tienePlanSeleccionado(false)).toBe(true)
    expect(component.tienePlanSeleccionado(true)).toBe(true)
  });

  it('should validate enabled plan', () => {
    component.planesDeportista = _PLANES_RESPONSE.respuesta
    component.planesDeportista[0].selected = true
    component.planes = _PLANES_RESPONSE.respuesta
    component.validarPlanAsignadoDeportista()
    expect(component.botonDeshabilitado).toBe(true)
  });

  it('should assign plan to deportista', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    component.planes[0].selected = true
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(of(_PLANES_RESPONSE));
    spyOn(planesService, 'asignarPlanDeportista').and.returnValue(of({}));
    component.asignarPlanDeportista()
    expect(component.planesDeportista.length).toBeGreaterThan(0)
  });

  it('should handle authentication error from assign plan to deportista', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(planesService, 'asignarPlanDeportista').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.asignarPlanDeportista();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from assign plan to deportista', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    component.planes[0].selected = true
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(planesService, 'asignarPlanDeportista').and.returnValue(throwError(mockError));

    component.asignarPlanDeportista();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error occurred');
  });

  it('should handle error from assign plan to deportista without description', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    component.planes[0].selected = true
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(planesService, 'asignarPlanDeportista').and.returnValue(throwError(mockError));

    component.asignarPlanDeportista();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error al asociar un plan al deportista, intente más tarde');
  });

  //

  it('should remove plan to deportista', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    component.planes[0].selected = true
    spyOn(planesService, 'obtenerPlanesPorDeportista').and.returnValue(of(new PlanesRespuesta([], "1234567890")));
    spyOn(planesService, 'removerPlanDeportista').and.returnValue(of({}));
    component.removerPlanDeportista()
    expect(component.planesDeportista.length).toBe(0)
  });

  it('should handle authentication error from remove plan to deportista', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    component.planes[0].selected = true
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(planesService, 'removerPlanDeportista').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.removerPlanDeportista();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from remove plan to deportista', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    component.planes[0].selected = true
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(planesService, 'removerPlanDeportista').and.returnValue(throwError(mockError));

    component.removerPlanDeportista();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error occurred');
  });

  it('should handle error from remove plan to deportista without description', () => {
    component.planes = _PLANES_RESPONSE.respuesta
    
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(planesService, 'removerPlanDeportista').and.returnValue(throwError(mockError));

    component.removerPlanDeportista();

    expect(component.errorResponse).toBe(true);
    expect(component.errorDescription).toBe('Error al eliminar el servicio del deportista, intente más tarde');
  });

});
