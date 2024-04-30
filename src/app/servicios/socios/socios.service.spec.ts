/* tslint:disable:no-unused-variable */
import {TestBed, async, inject} from '@angular/core/testing';
import {SocioService} from './socios.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PersonasService} from "../personas/personas.service";
import { environment } from 'src/environments/environment';

describe('Service: Socios', () => {
    let service: SocioService;
    let httpCtrl: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SocioService]
        });
        service = TestBed.inject(SocioService);
        httpCtrl = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should create a partner from HTTP call', () => {
        service.registrarSocio({}).subscribe({
          next: (response) => {
            expect(response).toBeTruthy();
          }
        })
        const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/socio')
        const httpRequest = mockHttp.request;
    
        expect(httpRequest.method).toEqual("POST");
    
        mockHttp.flush({});
      });

    it('Should update a partner from HTTP call', () => {
        service.actualizarSocio({}, "idSocio").subscribe({
          next: (response) => {
            expect(response).toBeTruthy();
          }
        })
        const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/socio/idSocio')
        const httpRequest = mockHttp.request;
    
        expect(httpRequest.method).toEqual("POST");
    
        mockHttp.flush({});
      });

    it('Should get a partner by id from HTTP call', () => {
        service.getSocioId("idSocio").subscribe({
          next: (response) => {
            expect(response).toBeTruthy();
          }
        })
        const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/socios/idSocio')
        const httpRequest = mockHttp.request;
    
        expect(httpRequest.method).toEqual("GET");
    
        mockHttp.flush({});
      });

      it('Should get the partners list from HTTP call', () => {
        service.getSocios().subscribe({
          next: (response) => {
            expect(response).toBeTruthy();
          }
        })
        const mockHttp = httpCtrl.expectOne(environment.baseUrlAdministracion + '/socios')
        const httpRequest = mockHttp.request;
    
        expect(httpRequest.method).toEqual("GET");
    
        mockHttp.flush({});
      });
});

