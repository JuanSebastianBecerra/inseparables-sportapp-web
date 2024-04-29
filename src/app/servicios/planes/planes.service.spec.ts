import { TestBed } from '@angular/core/testing';

import { PlanesService } from './planes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlanesService', () => {
  let service: PlanesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlanesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
