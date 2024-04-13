/* tslint:disable:no-unused-variable */
import {TestBed, async, inject} from '@angular/core/testing';
import {SocioService} from './socios.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PersonasService} from "../personas/personas.service";

describe('Service: Socios', () => {
    let service: SocioService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SocioService]
        });
        service = TestBed.inject(SocioService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

