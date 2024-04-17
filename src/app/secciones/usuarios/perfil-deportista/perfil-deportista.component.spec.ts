import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDeportistaComponent } from './perfil-deportista.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";

describe('PerfilDeportistaComponent', () => {
  let component: PerfilDeportistaComponent;
  let fixture: ComponentFixture<PerfilDeportistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PerfilDeportistaComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [],
      providers: [],
    });
    fixture = TestBed.createComponent(PerfilDeportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
