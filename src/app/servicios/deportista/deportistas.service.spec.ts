import { TestBed } from '@angular/core/testing';

import { DeportistasService } from './deportistas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeportistasService', () => {
  let service: DeportistasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DeportistasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
