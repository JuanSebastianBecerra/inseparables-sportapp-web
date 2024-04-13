import { TestBed } from '@angular/core/testing';

import { ServiciosService } from './servicios.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ServiciosService', () => {
  let service: ServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiciosService]
    });
    service = TestBed.inject(ServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
