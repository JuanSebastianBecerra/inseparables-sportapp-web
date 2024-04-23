import { TestBed } from '@angular/core/testing';

import { EntrenamientosService } from './entrenamientos.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('EntrenamientosService', () => {
  let service: EntrenamientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EntrenamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
