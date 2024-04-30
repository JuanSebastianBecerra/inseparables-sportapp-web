import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioComponent } from './socio.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { of, throwError } from 'rxjs';

describe('SocioComponent', () => {
  let component: SocioComponent;
  let fixture: ComponentFixture<SocioComponent>;
  let socioService : SocioService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocioComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(SocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    socioService = TestBed.inject(SocioService)
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
});

