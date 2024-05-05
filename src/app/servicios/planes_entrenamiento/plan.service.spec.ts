import { TestBed } from '@angular/core/testing';

import { PlanService } from './plan.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';

describe('Service: Plan', () => {
  let service: PlanService;
  let httpCtrl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanService]
    });
    service = TestBed.inject(PlanService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the service', () => {
    service.registrarPlan({}).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
      }
    })
    const mockHttp = httpCtrl.expectOne(environment.baseUrlDeporte + '/plan-entrenamiento')
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("POST");

    mockHttp.flush({});
  });


});

