/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaSocioComponent } from './consultaSocio.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";

describe('ConsultaSocioComponent', () => {
  let component: ConsultaSocioComponent;
  let fixture: ComponentFixture<ConsultaSocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConsultaSocioComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
