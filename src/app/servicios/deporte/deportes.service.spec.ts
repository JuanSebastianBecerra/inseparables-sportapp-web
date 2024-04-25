import { TestBed } from '@angular/core/testing';

import { DeportesService } from './deportes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeportesService', () => {
  let service: DeportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DeportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
