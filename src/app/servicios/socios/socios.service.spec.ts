/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { SocioService } from './socios.service';

describe('Service: Socios', () => {
  let service: SocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

