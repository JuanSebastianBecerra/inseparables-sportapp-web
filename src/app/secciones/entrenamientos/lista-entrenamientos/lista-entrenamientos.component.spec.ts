import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrenamientosComponent } from './lista-entrenamientos.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";
import { EntrenamientosService } from 'src/app/servicios/entrenamientos/entrenamientos.service';
import { of, throwError } from 'rxjs';
import { DetalleEntrenamiento, RespuestaEntrenamientos } from 'src/app/clases/entrenamientos';

describe('ListaEntrenamientosComponent', () => {
  let component: ListaEntrenamientosComponent;
  let fixture: ComponentFixture<ListaEntrenamientosComponent>;
  let entrenamientosService: EntrenamientosService

  const _DETALLE_ENTRENAMIENTO = [new DetalleEntrenamiento("1", "Entrenamiento 1", "00:00", "23:59", "Bogotá", "MENSUAL", "Entrenamiento Detalle 1", "1")]
  const _ENTRENAMIENTOS_RESPONSE = new RespuestaEntrenamientos(_DETALLE_ENTRENAMIENTO, "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ListaEntrenamientosComponent, HttpClientTestingModule, ToastComponent]
    });
    fixture = TestBed.createComponent(ListaEntrenamientosComponent);
    component = fixture.componentInstance;
    entrenamientosService = TestBed.inject(EntrenamientosService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch entrenamientos on initialization', () => {
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(of(_ENTRENAMIENTOS_RESPONSE));
    component.ngOnInit();
    expect(component.entrenamientos).toEqual(_ENTRENAMIENTOS_RESPONSE.entrenamientos);
  });

  it('should handle error from fetching entrenamientos', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorObtenerEntrenamientos).toBe(true);
    expect(component.errorObtenerEntrenamientos).toBe('Error occurred');
  });

  it('should handle error from fetching entrenamientos without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(throwError(mockError));

    component.ngOnInit();

    expect(component.mostrarErrorObtenerEntrenamientos).toBe(true);
    expect(component.errorObtenerEntrenamientos).toBe('Error al consultar el listado de los entrenamientos, intente más tarde');
  });
});
