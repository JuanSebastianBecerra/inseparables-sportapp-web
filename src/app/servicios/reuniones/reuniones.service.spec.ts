import { TestBed } from '@angular/core/testing';

import { ReunionesService } from './reuniones.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ReunionesService', () => {
  let service: ReunionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReunionesService]
    });
    service = TestBed.inject(ReunionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});