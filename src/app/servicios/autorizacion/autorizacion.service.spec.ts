import { TestBed } from '@angular/core/testing';

import { AutorizacionService } from './autorizacion.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AutorizacionService', () => {
  let service: AutorizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutorizacionService]
    });
    service = TestBed.inject(AutorizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
