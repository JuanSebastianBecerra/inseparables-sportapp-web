import { TestBed } from '@angular/core/testing';

import { AdministracionService } from './administracion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlanesService', () => {
  let service: AdministracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdministracionService]
    });
    service = TestBed.inject(AdministracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
