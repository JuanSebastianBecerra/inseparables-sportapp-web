import { TestBed } from '@angular/core/testing';

import { ServiciosService } from './servicios.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';

describe('ServiciosService', () => {
  let service: ServiciosService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiciosService]
    });
    service = TestBed.inject(ServiciosService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the service', () => {
    service.registrarServicio({}).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/producto_servicio')
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({});
  });

  it('should get the services', () => {
    service.obtenerServicios().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/producto_servicio')
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush({});
  });

  it('should get the service by id', () => {
    service.obtenerServicioPorId("id").subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/producto_servicio/id')
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush({});
  });
});
