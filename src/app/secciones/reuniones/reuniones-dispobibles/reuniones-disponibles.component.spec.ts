import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionesDisponiblesComponent } from './reuniones-disponibles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { ReunionesService } from 'src/app/servicios/reuniones/reuniones.service';
import { RespuestaReuniones, Reunion } from 'src/app/clases/reunion';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ReunionesDisponiblesComponent', () => {
  let component: ReunionesDisponiblesComponent;
  let fixture: ComponentFixture<ReunionesDisponiblesComponent>;
  let reunionesService : ReunionesService
  let router: Router

  const _REUNION = new Reunion("1","2024/05/28", "Bogotá", "1", "1", "Entrenador 1", "Detalle entrenador 1")
  const _REUNIONES_RESPONSE = new RespuestaReuniones([_REUNION], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReunionesDisponiblesComponent],
      imports: [HttpClientTestingModule, ToastComponent]
    });
    fixture = TestBed.createComponent(ReunionesDisponiblesComponent);
    component = fixture.componentInstance;
    reunionesService = TestBed.inject(ReunionesService)
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch reuniones on initialization', () => {
    spyOn(reunionesService, 'getReunionesDisponibles').and.returnValue(of(_REUNIONES_RESPONSE));
    component.ngOnInit();
    expect(component.reuniones).toEqual(_REUNIONES_RESPONSE.respuesta);
  });

  it('should handle authentication error from fetching reuniones', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(reunionesService, 'getReunionesDisponibles').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });


  it('should handle error from fetching servicios recomendados', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(reunionesService, 'getReunionesDisponibles').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorGetReuniones).toBe(true);
    expect(component.errorGetReuniones).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(reunionesService, 'getReunionesDisponibles').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorGetReuniones).toBe(true);
    expect(component.errorGetReuniones).toBe('Error al consultar la lista de sesiones disponibles');
  });

  it('should agendar sesion on initialization', () => {
    spyOn(reunionesService, 'agendarSesion').and.returnValue(of({"body": "some"}));
    component.agendarSesion("1");
    expect(component.exitoso).toBeTrue()
  });

  it('should handle error from agendar sesion', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(reunionesService, 'agendarSesion').and.returnValue(throwError(mockError));

    component.agendarSesion("1");

    expect(component.mostrarErrorGetReuniones).toBe(true);
    expect(component.errorGetReuniones).toBe('Error occurred');
  });

  it('should handle error from agendar sesion without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(reunionesService, 'agendarSesion').and.returnValue(throwError(mockError));

    component.agendarSesion("1");

    expect(component.mostrarErrorGetReuniones).toBeTrue();
    expect(component.errorGetReuniones).toBe('Ocurrió un error al realizar la petición');
  });

})
