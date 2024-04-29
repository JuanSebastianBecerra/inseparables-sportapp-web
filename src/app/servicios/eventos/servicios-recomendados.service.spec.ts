import { TestBed } from '@angular/core/testing';

import { ServiciosRecomendadosService } from './servicios-recomendados.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RespuestaServiciosRecomendados } from 'src/app/clases/detalle-servicio-recomendado';
import { Servicio } from 'src/app/clases/servicio';
import { environment } from 'src/environments/environment';

describe('ServiciosRecomendadosService', () => {
  let service: ServiciosRecomendadosService;
  let httpCtrl: HttpTestingController

  const _DETALLE_SERVICIO = new Servicio("Servicio Mock", "Detalle servicio mock", "1", "1", "1", "Nombre del Socio", "Servicio 1", 30)
  const _SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE = new RespuestaServiciosRecomendados([_DETALLE_SERVICIO], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServiciosRecomendadosService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return the services recomended by event list from HTTP call', () => {
    service.getServiciosRecomendadosPorEvento("idEvento").subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.respuesta.length).toBeGreaterThanOrEqual(1)
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + "/evento/idEvento/servicios");
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(_SERVICIOS_RECOMENDADOS_EVENTO_RESPONSE);
  });
});
