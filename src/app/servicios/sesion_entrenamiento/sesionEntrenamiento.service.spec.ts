import { TestBed } from '@angular/core/testing';

import { SesionEntrenamientoService } from './sesionEntrenamiento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SesionEntrenamientoService', () => {
  let service: SesionEntrenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SesionEntrenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
