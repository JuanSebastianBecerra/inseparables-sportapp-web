import { TestBed } from '@angular/core/testing';

import { ValidarTokenService } from './validar-token.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ValidarTokenService', () => {
  let service: ValidarTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ValidarTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
