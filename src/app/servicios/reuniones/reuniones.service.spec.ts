/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReunionesService } from './reuniones.service';

describe('Service: Reuniones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReunionesService]
    });
  });

  it('should ...', inject([ReunionesService], (service: ReunionesService) => {
    expect(service).toBeTruthy();
  }));
});
