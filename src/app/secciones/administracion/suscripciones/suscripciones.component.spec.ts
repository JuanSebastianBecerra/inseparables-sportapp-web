import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesComponent } from './suscripciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AdministracionService } from 'src/app/servicios/administracion/administracion.service';
import { of, throwError } from 'rxjs';

describe('SuscripcionesComponent', () => {
  let component: SuscripcionesComponent;
  let fixture: ComponentFixture<SuscripcionesComponent>;
  let administracionService: AdministracionService;

  const _PLANES = [
    {"nombre": "Plan básico", "funciones": "Funciones básicas", "id":"1", "llave":"BASICO", "valor_mensual": 100},
    {"nombre": "Plan intermedio", "funciones": "Funciones intermedias", "id":"2", "llave":"INTERMEDIO", "valor_mensual": 200},
    {"nombre": "Plan premium", "funciones": "Funciones premium", "id":"3", "llave":"PREMIUM", "valor_mensual": 300}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [SuscripcionesComponent],
      providers: [AdministracionService]
    });
    fixture = TestBed.createComponent(SuscripcionesComponent);
    component = fixture.componentInstance;
    administracionService = TestBed.inject(AdministracionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch planes on initialization', () => {
    spyOn(administracionService, 'obtenerPlanes').and.returnValue(of({ body: _PLANES }));
    component.ngOnInit();
    expect(component.planes).toEqual(_PLANES);
  });

  it('should handle error from fetching planes', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(administracionService, 'obtenerPlanes').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(administracionService, 'obtenerPlanes').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should render the suscriptions lists', () => {    
    component.planes = _PLANES
    fixture.detectChanges();
    let cardTitleElements = fixture.debugElement.queryAll(By.css(".card-title"))
    expect(cardTitleElements.length).toEqual(component.planes.length);
  });
});
