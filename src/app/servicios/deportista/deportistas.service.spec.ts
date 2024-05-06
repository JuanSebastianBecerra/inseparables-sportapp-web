import { TestBed } from '@angular/core/testing';

import { DeportistasService } from './deportistas.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DeportistasService', () => {
  let service: DeportistasService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DeportistasService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should asign service to user from HTTP call', () => {
    service.asignarServicioADeportista("idServicio").subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.respuesta).toBeTruthy()
        expect(response.token).toBeTruthy()
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/deportista/servicio/idServicio');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({"respuesta": "Servicio asignado correctamente al deportista", "token" : "1234567890"});
  });

  it('Should asign event to user from HTTP call', () => {
    service.asignarEventoAgendaDeportista("idEvento").subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.respuesta).toBeTruthy()
        expect(response.token).toBeTruthy()
      }
    })

    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/deportista/evento/idEvento');
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({"respuesta": "Evento asignado correctamente al deportista", "token" : "1234567890"});
  })


});
