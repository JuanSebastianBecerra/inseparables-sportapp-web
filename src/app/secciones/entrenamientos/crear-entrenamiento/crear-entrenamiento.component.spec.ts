import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntrenamientoComponent } from './crear-entrenamiento.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { EntrenamientosService } from 'src/app/servicios/entrenamientos/entrenamientos.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrearEntrenamientoComponent', () => {
  let component: CrearEntrenamientoComponent;
  let fixture: ComponentFixture<CrearEntrenamientoComponent>;
  let entrenamientoService: EntrenamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CrearEntrenamientoComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [EntrenamientosService]
    });
    fixture = TestBed.createComponent(CrearEntrenamientoComponent);
    component = fixture.componentInstance;
    entrenamientoService = TestBed.inject(EntrenamientosService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save the training', () => {
    const mockResponse = {}

    spyOn(entrenamientoService, 'guardarEntrenamiento').and.returnValue(of(mockResponse));
    
    component.guardarEntrenamiento({})
    expect(component.entrenamientoForm.get("nombre")!.value).toEqual(null)

  });

  it('should handle error when save the training', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(entrenamientoService, 'guardarEntrenamiento').and.returnValue(throwError(mockError));

    component.guardarEntrenamiento({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error when save the training without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(entrenamientoService, 'guardarEntrenamiento').and.returnValue(throwError(mockError));

    component.guardarEntrenamiento({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar el registro del entrenamiento');
  });
});
