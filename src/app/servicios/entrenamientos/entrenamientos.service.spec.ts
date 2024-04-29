import { TestBed } from '@angular/core/testing';

import { EntrenamientosService } from './entrenamientos.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';
import { DetalleEntrenamiento, RespuestaEntrenamientos } from 'src/app/clases/entrenamientos';

describe('EntrenamientosService', () => {
  let service: EntrenamientosService;
  let httpCtrl: HttpTestingController;

  let entrenamientosUrl = environment.baseUrlDeporte + '/entrenamientos';
  let guardarEntrenamientoUrl = environment.baseUrlDeporte + '/entrenamiento';

  const _DETALLE_ENTRENAMIENTO = new DetalleEntrenamiento("1", "Entrenamiento1", "00:00", "23:59", "Bogotá", "SEMANAL", "Entrenamiento 1 Detalle", "1")
  const _ENTRENAMIENTOS_RESPONSE = new RespuestaEntrenamientos([_DETALLE_ENTRENAMIENTO], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EntrenamientosService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get "entrenamientos" from HTTP call', () => {
    service.obtenerEntrenamientos().subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.entrenamientos.length).toBeGreaterThanOrEqual(1)
      }
    })
    const mockHttp = httpCtrl.expectOne(entrenamientosUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(_ENTRENAMIENTOS_RESPONSE);
  })

  it('Should save the "entrenamiento" from HTTP call', () => {
    service.guardarEntrenamiento({}).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(guardarEntrenamientoUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush(_ENTRENAMIENTOS_RESPONSE);
  })
});
