import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDeportistaComponent } from './perfil-deportista.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";
import { AdministracionService } from 'src/app/servicios/administracion/administracion.service';
import { of, throwError } from 'rxjs';
import {TranslateModule} from "@ngx-translate/core";

describe('PerfilDeportistaComponent', () => {
  let component: PerfilDeportistaComponent;
  let fixture: ComponentFixture<PerfilDeportistaComponent>;
  let administracionService : AdministracionService;

  const _PAISES_MOCK = [{"codigo": "CO", "nombre": "Colombia"}]
  const _CIUDADES_MOCK = [{"codigo": "BO", "nombre": "Bogotá", "pais": "CO"}]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PerfilDeportistaComponent, HttpClientTestingModule, AppRoutingModule, TranslateModule.forRoot()],
      declarations: [],
      providers: [],
    });
    fixture = TestBed.createComponent(PerfilDeportistaComponent);
    component = fixture.componentInstance;
    administracionService = TestBed.inject(AdministracionService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch paises on initialization', () => {
    spyOn(administracionService, 'obtenerPaises').and.returnValue(of(_PAISES_MOCK))
    component.obtenerPaises();
    expect(component.paises).toEqual(_PAISES_MOCK);
  });

  it('should handle error from fetching paises', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(administracionService, 'obtenerPaises').and.returnValue(throwError(mockError))
    component.obtenerPaises();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching paises without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(administracionService, 'obtenerPaises').and.returnValue(throwError(mockError))
    component.obtenerPaises();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should fetch ciudad nacimiento on initialization', () => {
    spyOn(administracionService, 'obtenerCiudades').and.returnValue(of(_CIUDADES_MOCK))
    component.obtenerCiudadesNacimiento("CO");
    expect(component.ciudadesNacimiento).toEqual(_CIUDADES_MOCK);
  });

  it('should handle error from fetching ciudad nacimiento', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(administracionService, 'obtenerCiudades').and.returnValue(throwError(mockError))
    component.obtenerCiudadesNacimiento("CO");

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching ciudad nacimiento without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(administracionService, 'obtenerCiudades').and.returnValue(throwError(mockError))
    component.obtenerCiudadesNacimiento("CO");

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should fetch ciudad residencia on initialization', () => {
    spyOn(administracionService, 'obtenerCiudades').and.returnValue(of(_CIUDADES_MOCK))
    component.obtenerCiudadesResidencia("CO");
    expect(component.ciudadesResidencia).toEqual(_CIUDADES_MOCK);
  });

  it('should handle error from fetching ciudad residencia', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(administracionService, 'obtenerCiudades').and.returnValue(throwError(mockError))
    component.obtenerCiudadesResidencia("CO");

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching ciudad residencia without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(administracionService, 'obtenerCiudades').and.returnValue(throwError(mockError))
    component.obtenerCiudadesResidencia("CO");

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });
});
