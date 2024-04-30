import { TestBed } from '@angular/core/testing';

import { AutorizacionService } from './autorizacion.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';

describe('AutorizacionService', () => {
  let service: AutorizacionService;
  let httpCtrl: HttpTestingController

  const _LOGIN_RESPONSE = {
    "rol": "DEPORTISTA",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTQwNzM2ODksImlhdCI6MTcxNDA3MTg4OSwic3ViIjoiZjI5MjBmOWItZjA3MS00NGVkLTkwMzUtYzBmMDdlYzY4YzNmIn0.2clUED7vqKsZkyIaC5ezaEUoBF-pJNXi2ZK7y8vtK6U"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutorizacionService]
    });
    service = TestBed.inject(AutorizacionService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should do login from HTTP call', () => {
    let bodyRequest = {}
    service.doLogin(bodyRequest).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.rol).toBeDefined()
        expect(response.rol).toEqual(_LOGIN_RESPONSE.rol)
        expect(response.token).toBeDefined()
        expect(response.token).toEqual(_LOGIN_RESPONSE.token)
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlPersonas + '/ingresar');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush(_LOGIN_RESPONSE);
  })
});
