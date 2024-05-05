
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeportesService } from 'src/app/servicios/deporte/deportes.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/servicios/planes_entrenamiento/plan.service';
import { EntrenamientosService } from 'src/app/servicios/entrenamientos/entrenamientos.service';
import { CrearPlanComponent } from './crear-plan.component';
import { DetalleEntrenamiento, RespuestaEntrenamientos } from 'src/app/clases/entrenamientos';

describe('CrearPlanComponent', () => {
  let component: CrearPlanComponent;
  let fixture: ComponentFixture<CrearPlanComponent>;
  let deportesService : DeportesService;
  let entrenamientosService : EntrenamientosService;
  let planService: PlanService;
  let router: Router

  const _DEPORTES_MOCK = [{"id": "1", "nombre": "Ciclismo"},{"id": "2", "nombre": "Atletismo"}]
  const _DETALLE_ENTRENAMIENTO = new DetalleEntrenamiento("1","Entre 1", "01", "02", "Bogotá", "1", "test", "1");
  const _ENTRENAMIENTO_RESPONSE = new RespuestaEntrenamientos([_DETALLE_ENTRENAMIENTO], "1");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrearPlanComponent, HttpClientTestingModule, RouterTestingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(CrearPlanComponent);
    component = fixture.componentInstance;
    deportesService = TestBed.inject(DeportesService)
    entrenamientosService = TestBed.inject(EntrenamientosService)
    planService = TestBed.inject(PlanService)
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

  it('should handle error from fetching deportes', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(deportesService, 'obtenerDeportes').and.returnValue(throwError(mockError))
    component.obtenerDeportes();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should fetch entrenamientos on initialization', () => {
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(of(_ENTRENAMIENTO_RESPONSE))
    component.obtenerEntrenamientos();
    expect(component.entrenamientos).toEqual(_ENTRENAMIENTO_RESPONSE.entrenamientos);
  });

  it('should handle error from fetching entrenamientos', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(throwError(mockError))
    component.obtenerEntrenamientos();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching entrenamientos without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(throwError(mockError))
    component.obtenerEntrenamientos();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should fetch guardar plan', () => {
    spyOn(planService, 'registrarPlan').and.returnValue(of(_ENTRENAMIENTO_RESPONSE))
    component.registrarPlan({});
    expect(component.exitoso).toBe(true);
  });

  it('should handle error from guardar plan', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(planService, 'registrarPlan').and.returnValue(throwError(mockError))
    component.registrarPlan({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from guardar plan without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(planService, 'registrarPlan').and.returnValue(throwError(mockError))
    component.registrarPlan({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

});
