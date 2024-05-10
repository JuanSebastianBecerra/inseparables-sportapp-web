import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioComponent } from './socio.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { of, throwError } from 'rxjs';
import {TranslateModule} from "@ngx-translate/core";
import { ValidarTokenService } from 'src/app/servicios/autorizacion/validar-token.service';
import { Router } from '@angular/router';
import { TOKEN_KEY } from 'src/app/utils/constants';

describe('SocioComponent', () => {
  let component: SocioComponent;
  let fixture: ComponentFixture<SocioComponent>;
  let socioService : SocioService
  let validarTokenService : ValidarTokenService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocioComponent, HttpClientTestingModule, AppRoutingModule, TranslateModule.forRoot()],
      declarations: []
    });
    fixture = TestBed.createComponent(SocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    socioService = TestBed.inject(SocioService)
    validarTokenService = TestBed.inject(ValidarTokenService)

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch deportes on initialization', () => {
    spyOn(socioService, 'registrarSocio').and.returnValue(of({body: "some"}))
    component.registrarSocio({});
    expect(component.exitoso).toBe(true);
  });

  it('should handle error from fetching deportes', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(socioService, 'registrarSocio').and.returnValue(throwError(mockError))
    component.registrarSocio({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Error occurred');
  });

  it('should handle error from fetching planes without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(socioService, 'registrarSocio').and.returnValue(throwError(mockError))
    component.registrarSocio({});

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

  it('should route to / sin token', () => {
    localStorage.clear()
    const navigateSpy = spyOn(router, 'navigate');
    component.validarToken();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should route to / sin autorizacion', () => {
    localStorage.setItem(TOKEN_KEY, "1234567890")
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(validarTokenService, 'validarToken').and.returnValue(throwError(mockError))
    const navigateSpy = spyOn(router, 'navigate');
    component.validarToken();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should not route to / con autorización', () => {
    localStorage.setItem(TOKEN_KEY, "1234567890")
    spyOn(validarTokenService, 'validarToken').and.returnValue(of({body: "some"}))
    const navigateSpy = spyOn(router, 'navigate');
    component.validarToken();
    expect(navigateSpy).toHaveBeenCalledTimes(0);
  });
});

