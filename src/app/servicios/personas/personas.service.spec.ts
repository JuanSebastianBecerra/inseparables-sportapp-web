import { TestBed } from '@angular/core/testing';

import { PersonasService } from './personas.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PersonasService', () => {
  let service: PersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonasService]
    });
    service = TestBed.inject(PersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
