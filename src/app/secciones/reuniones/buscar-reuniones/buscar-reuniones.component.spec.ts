import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReunionesComponent } from './buscar-reuniones.component';
import { FormsModule } from '@angular/forms';

describe('BuscarReunionesComponent', () => {
  let component: BuscarReunionesComponent;
  let fixture: ComponentFixture<BuscarReunionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarReunionesComponent],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(BuscarReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
