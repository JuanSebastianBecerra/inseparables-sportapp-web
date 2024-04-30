import { TestBed } from '@angular/core/testing';

import { PersonasService } from './personas.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';

describe('PersonasService', () => {
  let service: PersonasService;
  let httpCtrl: HttpTestingController;

  let registroUrl = environment.baseUrlPersonas + '/usuario';
  let registroPerfilDeportivoUrl = environment.baseUrlPersonas + '/perfildeportivo';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonasService]
    });
    service = TestBed.inject(PersonasService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should save an user from HTTP call', () => {
    service.registrarUsuario({}).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })

    const mockHttp = httpCtrl.expectOne(registroUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({});
  });

  it('Should save an sport profile of the user from HTTP call', () => {
    service.registrarPerfilDeportivo({}).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })

    const mockHttp = httpCtrl.expectOne(registroPerfilDeportivoUrl);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({});
  });
});
