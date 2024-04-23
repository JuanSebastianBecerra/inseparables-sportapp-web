import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEntrenamientoComponent } from './buscar-entrenamiento.component';
import {FormsModule} from "@angular/forms";

describe('BuscarEntrenamientoComponent', () => {
  let component: BuscarEntrenamientoComponent;
  let fixture: ComponentFixture<BuscarEntrenamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarEntrenamientoComponent],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(BuscarEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
