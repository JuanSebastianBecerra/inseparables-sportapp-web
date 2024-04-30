import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarServicioComponent } from './listar-servicio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { DetalleServicio, RespuestaServicios } from 'src/app/clases/servicios';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ListarServicioComponent', () => {
  let component: ListarServicioComponent;
  let fixture: ComponentFixture<ListarServicioComponent>;
  let serviciosService : ServiciosService;
  let router: Router

  const _DETALLE_SERVICIO = new DetalleServicio("1", "Descripción Servicio", "Detalle Servicio", "1", "1", "1", 30)
  const _SERVICIO_RESPONSE = new RespuestaServicios([_DETALLE_SERVICIO], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarServicioComponent],
      imports: [HttpClientTestingModule, ToastComponent]
    });
    fixture = TestBed.createComponent(ListarServicioComponent);
    component = fixture.componentInstance;
    serviciosService = TestBed.inject(ServiciosService)
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch servicios on initialization', () => {
    spyOn(serviciosService, 'obtenerServicios').and.returnValue(of(_SERVICIO_RESPONSE));
    component.getServicios();
    expect(component.servicios).toEqual(_SERVICIO_RESPONSE.respuesta);
  });

  it('should handle authentication error from fetching servicios', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(serviciosService, 'obtenerServicios').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });


  it('should handle error from fetching servicios', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(serviciosService, 'obtenerServicios').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorServicios).toBe(true);
    expect(component.errorServicios).toBe('Error occurred');
  });

  it('should handle error from fetching servcios without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(serviciosService, 'obtenerServicios').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorServicios).toBe(true);
    expect(component.errorServicios).toBe('Error al consultar la lista de socios, intente más tarde');
  });

  it('should handle authentication error from fetching servicios', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(serviciosService, 'obtenerServicios').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
