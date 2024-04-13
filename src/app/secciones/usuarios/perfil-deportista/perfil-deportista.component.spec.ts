import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDeportistaComponent } from './perfil-deportista.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PerfilDeportistaComponent', () => {
  let component: PerfilDeportistaComponent;
  let fixture: ComponentFixture<PerfilDeportistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PerfilDeportistaComponent, HttpClientTestingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(PerfilDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
