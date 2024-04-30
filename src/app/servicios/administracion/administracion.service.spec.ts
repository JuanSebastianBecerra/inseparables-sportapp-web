import { TestBed } from '@angular/core/testing';

import { AdministracionService } from './administracion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';

describe('PlanesService', () => {
  let service: AdministracionService;
  let httpCtrl: HttpTestingController

  const _PLANES_RESPONSE = [
    {
        "funciones": "Funciones ...",
        "id": "5693ae77-6b14-430d-89b3-28401b56b93a",
        "llave": "BASICO",
        "nombre": "Plan Básico",
        "valor_mensual": 10000
    }
  ]

  const _PAISES_RESPONSE = [
    {
      "codigo": "CO",
      "nombre": "Colombia"
    }
  ]

  const _CIUDADES_RESPONSE = [
    {
      "codigo": "BO",
      "nombre": "Bogotá",
      "pais": "CO"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdministracionService]
    });
    service = TestBed.inject(AdministracionService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('Should return "planes" list from HTTP call', () => {

    service.obtenerPlanes().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(1)
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/plan');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(_PLANES_RESPONSE);
  })

  it('Should return "paises" list from HTTP call', () => {

    service.obtenerPaises().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.length).toBeGreaterThanOrEqual(1)
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/paises');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(_PAISES_RESPONSE);
  })

  it('Should return "ciudades" list from HTTP call', () => {

    service.obtenerCiudades("CO").subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.length).toBeGreaterThanOrEqual(1)
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/paises/CO/ciudades');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(_CIUDADES_RESPONSE);
  })
});
