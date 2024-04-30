import { TestBed } from '@angular/core/testing';

import { DeportesService } from './deportes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DeportesService', () => {
  let service: DeportesService;
  let httpCtrl: HttpTestingController

  const _DEPORTES_RESPONSE = [
    {
      "id": "794947d6-9e3e-41b3-9129-e9583918000b",
      "nombre": "Atletismo"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DeportesService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return "planes" list from HTTP call', () => {
    service.obtenerDeportes().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.body.length).toBeGreaterThanOrEqual(1)
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlDeporte + '/deportes');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(_DEPORTES_RESPONSE);
  });
});
