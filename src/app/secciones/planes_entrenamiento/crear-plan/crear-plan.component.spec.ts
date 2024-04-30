/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPlanComponent } from './crear-plan.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";


describe('CrearPlanComponent', () => {
  let component: CrearPlanComponent;
  let fixture: ComponentFixture<CrearPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CrearPlanComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(CrearPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});