import { TestBed } from '@angular/core/testing';

import { ServiciosRecomendadosService } from './servicios-recomendados.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiciosRecomendadosService', () => {
  let service: ServiciosRecomendadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ServiciosRecomendadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
