import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSociosComponent } from './listaSocios.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DetalleSocio, RespuestaSocios } from 'src/app/clases/detalle-socio';
import {TranslateModule} from "@ngx-translate/core";

describe('ListaSociosComponent', () => {
  let component: ListaSociosComponent;
  let fixture: ComponentFixture<ListaSociosComponent>;
  let socioService : SocioService
  let router: Router

  const _DETALLE_SOCIO = new DetalleSocio(1, "Socio", "Apellido", "Socio 1", "socio@socio.com", "CC", "124567890", "socio.socio", "1234567890");
  const _SOCIOS_RESPONSE = new RespuestaSocios([_DETALLE_SOCIO], "1234567890");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ListaSociosComponent, HttpClientTestingModule, AppRoutingModule, TranslateModule.forRoot()],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    socioService = TestBed.inject(SocioService)

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch socios on initialization', () => {
    spyOn(socioService, 'getSocios').and.returnValue(of(_SOCIOS_RESPONSE))
    component.getSocios();
    expect(component.socios).toEqual(_SOCIOS_RESPONSE.respuesta);
  });

  it('should handle error from fetching socios', () => {
    const mockError = { status: 404, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocios').and.returnValue(throwError(mockError))
    component.getSocios();

    expect(component.mostrarErrorGetSocios).toBe(true);
    expect(component.errorGetSocios).toBe('Error occurred');
  });

  it('should handle error from fetching socios without description', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(socioService, 'getSocios').and.returnValue(throwError(mockError))
    component.getSocios();

    expect(component.mostrarErrorGetSocios).toBe(true);
    expect(component.errorGetSocios).toBe('Error al consultar la lista de socios, intente más tarde');
  });

  it('should handle authentication error from fetching socios', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(socioService, 'getSocios').and.returnValue(throwError(mockError));

    const navigateSpy = spyOn(router, 'navigate');

    component.getSocios();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
