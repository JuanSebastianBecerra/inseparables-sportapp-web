import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSocioComponent} from './detalleSocio.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";

describe('SocioComponent', () => {
  let component: DetalleSocioComponent;
  let fixture: ComponentFixture<DetalleSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetalleSocioComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(DetalleSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

