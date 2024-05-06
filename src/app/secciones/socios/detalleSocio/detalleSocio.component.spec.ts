import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSocioComponent} from './detalleSocio.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { of, throwError } from 'rxjs';
import { DetalleSocio, RespuestaSocio } from 'src/app/clases/detalle-socio';
import { Router } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

describe('SocioComponent', () => {
  let component: DetalleSocioComponent;
  let fixture: ComponentFixture<DetalleSocioComponent>;
  let socioService: SocioService;
  let router: Router

  const _DETALLE_SOCIO = new DetalleSocio(1, "Socio", "Apellido", "Socio 1", "socio@socio.com", "CC", "124567890", "socio.socio", "1234567890");
  const _SOCIO_RESPONSE = new RespuestaSocio(_DETALLE_SOCIO, "1234567890");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetalleSocioComponent, HttpClientTestingModule, AppRoutingModule, TranslateModule.forRoot()],
      declarations: []
    });
    fixture = TestBed.createComponent(DetalleSocioComponent);
    component = fixture.componentInstance;
    socioService = TestBed.inject(SocioService)
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch socio', () => {
    spyOn(socioService, 'getSocioId').and.returnValue(of( _SOCIO_RESPONSE))
    component.getSocioId();
    expect(component.detalleSocio).toEqual(_SOCIO_RESPONSE.respuesta);
  });

  it('should handle error from fetching socios', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocioId').and.returnValue(throwError(mockError))
    component.getSocioId();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching socios without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(socioService, 'getSocioId').and.returnValue(throwError(mockError))
    component.getSocioId();

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error al consultar la lista de socios, intente más tarde');
  });

  it('should handle authentication error from fetching socios', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocioId').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.getSocioId();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should actualizar socio', () => {
    spyOn(socioService, 'actualizarSocio').and.returnValue(of({}))
    component.actualizarSocio({}, "");
    expect(component.exitoso).toBe(true);
  });

  it('should handle error from actualizar socio', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(socioService, 'actualizarSocio').and.returnValue(throwError(mockError))
    component.actualizarSocio({}, "");

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from actualizar socio without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(socioService, 'actualizarSocio').and.returnValue(throwError(mockError))
    component.actualizarSocio({}, "");

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

});

