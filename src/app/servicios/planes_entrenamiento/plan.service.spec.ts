/* tslint:disable:no-unused-variable */
import {TestBed, async, inject} from '@angular/core/testing';
import { PlanService } from './plan.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PersonasService} from "../personas/personas.service";

describe('Service: Plan', () => {
    let service: PlanService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PlanService]
        });
        service = TestBed.inject(PlanService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
