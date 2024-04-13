import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioComponent } from './socio.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";

describe('SocioComponent', () => {
  let component: SocioComponent;
  let fixture: ComponentFixture<SocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocioComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(SocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

