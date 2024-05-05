import { TestBed } from '@angular/core/testing';

import { EventosService } from './eventos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventosService', () => {
  let service: EventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
