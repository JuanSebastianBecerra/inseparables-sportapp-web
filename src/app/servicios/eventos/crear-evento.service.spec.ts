import { TestBed } from '@angular/core/testing';
import { CrearEventoService } from './crear-evento.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Evento } from 'src/app/clases/evento';
import { UbicacionMaps } from 'src/app/clases/location';
import {TranslateModule} from "@ngx-translate/core";

describe('Service: CrearEvento', () => {
  let service: CrearEventoService;
  let httpCtrl: HttpTestingController

  const _UBICACION = new UbicacionMaps("1", "Call 1234", "123", "456", "Direccion")
  const _DETALLE_SERVICIO = new Evento("1","Evento Mock", "2024-07-14 00:00:00", "2024-07-14 00:00:00", "detalle", "1", "1", _UBICACION)

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,  TranslateModule.forRoot()],
        providers: [CrearEventoService]
      });
      service = TestBed.inject(CrearEventoService);
      httpCtrl = TestBed.inject(HttpTestingController);
    });
    
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Should create a partner from HTTP call', () => {
        service.registrarEvento({}).subscribe({
          next: (response) => {
            expect(response).toBeTruthy();
          }
        })
        const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/evento')
        const httpRequest = mockHttp.request;
    
        expect(httpRequest.method).toEqual("POST");
    
        mockHttp.flush({});
      });
});


