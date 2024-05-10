import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrenamientosComponent } from './lista-entrenamientos.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";
import { EntrenamientosService } from 'src/app/servicios/entrenamientos/entrenamientos.service';
import { of, throwError } from 'rxjs';
import { DetalleEntrenamiento, RespuestaEntrenamientos } from 'src/app/clases/entrenamientos';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TOKEN_STRAVA } from 'src/app/utils/constants';

describe('ListaEntrenamientosComponent', () => {
  let component: ListaEntrenamientosComponent;
  let fixture: ComponentFixture<ListaEntrenamientosComponent>;
  let entrenamientosService: EntrenamientosService
  let router: Router

  const _DETALLE_ENTRENAMIENTO = [new DetalleEntrenamiento("1", "Entrenamiento 1", "00:00", "23:59", "Bogotá", "MENSUAL", "Entrenamiento Detalle 1", "1")]
  const _ENTRENAMIENTOS_RESPONSE = new RespuestaEntrenamientos(_DETALLE_ENTRENAMIENTO, "1234567890")

  const ID_RESPONSE = {"token": "123456", "id_usuario": "123456"}
  const STRAVA_RESPONSE = {"strava_client_id": "123456", "strava_client_secret": "123456"}
  const STRAVA__TOKEN_RESPONSE = {"access_token": "123456"}

  const mockParamMap = jasmine.createSpyObj('ParamMap', ['get']);
  mockParamMap.get.and.returnValue('code');

  const mockSnapshot = jasmine.createSpyObj('ActivatedRouteSnapshot', ['queryParamMap']);
  mockSnapshot.queryParamMap = mockParamMap;

  const mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  mockActivatedRoute.snapshot = mockSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ListaEntrenamientosComponent, HttpClientTestingModule, ToastComponent, RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    });
    fixture = TestBed.createComponent(ListaEntrenamientosComponent);
    component = fixture.componentInstance;
    entrenamientosService = TestBed.inject(EntrenamientosService)
    fixture.detectChanges();
    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch entrenamientos on initialization', () => {
    spyOn(entrenamientosService, 'obtenerEntrenamientos').and.returnValue(of(_ENTRENAMIENTOS_RESPONSE));
    component.ngOnInit();
    expect(component.entrenamientos).toEqual(_ENTRENAMIENTOS_RESPONSE.entrenamientos);
  });

  it('should fetch id on initialization', () => {
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    component.ngOnInit();
    expect(component.idUser).toEqual(ID_RESPONSE.id_usuario);
  });

  it('should handle auth error from fetching id', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(entrenamientosService, 'getId').and.returnValue(throwError(mockError));
    const navigateSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from fetching id', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(entrenamientosService, 'getId').and.returnValue(throwError(mockError));
    component.ngOnInit();
    expect(component.mostrarErrorObtenerEntrenamientos).toBe(true);
    expect(component.errorObtenerEntrenamientos).toBe('Error al obtener id');
  });

  it('should strava info on initialization', () => {
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    spyOn(entrenamientosService, 'getStravaInfo').and.callFake((idUsuarioParam: string) => {
      return of(STRAVA_RESPONSE);
    });
    component.ngOnInit();
    let url=environment.baseUrlStrava+"/oauth/authorize?"+"client_id="+STRAVA_RESPONSE.strava_client_id+"&redirect_uri="+window.location.origin+"/entrenamientos"+"&response_type=code&scope=activity:write,activity:read_all";
          
    expect(component.stravaLinkAuth).toEqual(url);
  });

  it('should handle auth error from fetching stravaInfo', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    spyOn(entrenamientosService, 'getStravaInfo').and.returnValue(throwError(mockError));
    const navigateSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from fetching stravaInfo', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    spyOn(entrenamientosService, 'getStravaInfo').and.returnValue(throwError(mockError));
    component.ngOnInit();
    expect(component.mostrarErrorObtenerEntrenamientos).toBe(true);
    expect(component.errorObtenerEntrenamientos).toBe('Error al obtener información Strava del usuario');
  });

  it('should auth', () => {
    component.ngOnInit();
    expect(component.authorized).toBe(true);
  });

  it('should get stravaToken', () => {
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    spyOn(entrenamientosService, 'getStravaInfo').and.callFake((idUsuarioParam: string) => {
      return of(STRAVA_RESPONSE);
    });
    spyOn(entrenamientosService, 'getTokenStrava').and.callFake((bodyRequest: any) => {
      return of(STRAVA__TOKEN_RESPONSE);
    });
    component.ngOnInit();  
    expect(localStorage.getItem(TOKEN_STRAVA)).toEqual(STRAVA__TOKEN_RESPONSE.access_token);
  });

  it('should handle auth error from fetching stravaToken', () => {
    const mockError = { status: 401, error: { description: 'Error occurred' } };
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    spyOn(entrenamientosService, 'getStravaInfo').and.callFake((idUsuarioParam: string) => {
      return of(STRAVA_RESPONSE);
    });
    spyOn(entrenamientosService, 'getTokenStrava').and.returnValue(throwError(mockError));
    const navigateSpy = spyOn(router, 'navigate');
    component.ngOnInit();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error from fetching stravaToken', () => {
    const mockError = { status: 404, error: { error: 'Error occurred' } };
    spyOn(entrenamientosService, 'getId').and.returnValue(of(ID_RESPONSE));
    spyOn(entrenamientosService, 'getStravaInfo').and.callFake((idUsuarioParam: string) => {
      return of(STRAVA_RESPONSE);
    });
    spyOn(entrenamientosService, 'getTokenStrava').and.returnValue(throwError(mockError));
    component.ngOnInit();
    expect(component.mostrarErrorObtenerEntrenamientos).toBe(true);
    expect(component.errorObtenerEntrenamientos).toBe('Error al autenticar con Strava');
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
