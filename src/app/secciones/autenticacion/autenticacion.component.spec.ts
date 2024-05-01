import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionComponent } from './autenticacion.component';
import {AppRoutingModule} from "../../app-routing.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AutorizacionService } from 'src/app/servicios/autorizacion/autorizacion.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ROL_KEY, TOKEN_KEY } from 'src/app/utils/constants';
import {TranslateModule} from "@ngx-translate/core";

describe('AutenticacionComponent', () => {
  let component: AutenticacionComponent;
  let fixture: ComponentFixture<AutenticacionComponent>;
  let autorizacionService: AutorizacionService
  let router: Router

  const _LOGIN_MOCK = {
    email: "correo@gmail.com",
    password: "1234567890"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AutenticacionComponent, HttpClientTestingModule, AppRoutingModule, RouterTestingModule, ReactiveFormsModule,
        TranslateModule.forRoot(),],
      declarations: []
    });
    fixture = TestBed.createComponent(AutenticacionComponent);
    component = fixture.componentInstance;
    autorizacionService = TestBed.inject(AutorizacionService);
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should enable the button when the login fields are filled", () => {

    component.ingresarForm.setValue(_LOGIN_MOCK);

    fixture.detectChanges();
  
    expect(component.ingresarForm.valid).toBeTruthy();
    const btnElement : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("#btn-submit");
    expect(btnElement.disabled).toBeFalsy();
  })

  it('should login and route to /socios', () => {
    const mockResponse = { token: '1234567890', rol: 'DEPORTISTA' };

    spyOn(autorizacionService, 'doLogin').and.returnValue(of(mockResponse));

    const navigateSpy = spyOn(router, 'navigate');

    component.validateUser(_LOGIN_MOCK);

    expect(autorizacionService.doLogin).toHaveBeenCalledWith(_LOGIN_MOCK);
    expect(localStorage.getItem(TOKEN_KEY)).toEqual(mockResponse.token);
    expect(localStorage.getItem(ROL_KEY)).toEqual(mockResponse.rol);
    expect(navigateSpy).toHaveBeenCalledWith(['/socios']);
  });

  it('should handle error when login without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(autorizacionService, 'doLogin').and.returnValue(throwError(mockError));

    component.validateUser(_LOGIN_MOCK);

    expect(component.responseError).toBe(true);
    expect(component.responseMessage).toBe('Ocurrió un error al realizar la petición');
  });

});
