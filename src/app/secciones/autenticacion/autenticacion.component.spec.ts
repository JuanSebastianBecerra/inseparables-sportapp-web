import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionComponent } from './autenticacion.component';
import {AppRoutingModule} from "../../app-routing.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AutenticacionComponent', () => {
  let component: AutenticacionComponent;
  let fixture: ComponentFixture<AutenticacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AutenticacionComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(AutenticacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
