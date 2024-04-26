import { TestBed } from '@angular/core/testing';

import { ReunionesService } from './reuniones.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';

describe('ReunionesService', () => {
  let service: ReunionesService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReunionesService]
    });
    service = TestBed.inject(ReunionesService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get "reuniones disponibles" from HTTP call', () => {
    service.getReunionesDisponibles().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion+"/reuniones/disponibles")
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush({});
  });

  it('Should create a meeting from HTTP call', () => {
    service.agendarSesion("id").subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion+"/reunion/id")
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({});
  });
});