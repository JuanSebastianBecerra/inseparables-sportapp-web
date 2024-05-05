import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonCrearEventoComponent } from './boton-crear-evento.component';

describe('BotonCrearEventoComponent', () => {
  let component: BotonCrearEventoComponent;
  let fixture: ComponentFixture<BotonCrearEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonCrearEventoComponent]
    });
    fixture = TestBed.createComponent(BotonCrearEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
