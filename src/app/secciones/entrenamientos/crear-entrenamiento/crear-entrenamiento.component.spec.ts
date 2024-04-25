import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntrenamientoComponent } from './crear-entrenamiento.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CrearEntrenamientoComponent', () => {
  let component: CrearEntrenamientoComponent;
  let fixture: ComponentFixture<CrearEntrenamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [CrearEntrenamientoComponent, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CrearEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
