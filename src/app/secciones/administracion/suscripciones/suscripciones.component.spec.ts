import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesComponent } from './suscripciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SuscripcionesComponent', () => {
  let component: SuscripcionesComponent;
  let fixture: ComponentFixture<SuscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [SuscripcionesComponent]
    });
    fixture = TestBed.createComponent(SuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
