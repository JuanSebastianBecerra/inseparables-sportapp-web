import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarServicioComponent } from './buscar-servicio.component';
import { FormsModule } from '@angular/forms';

describe('BuscarServicioComponent', () => {
  let component: BuscarServicioComponent;
  let fixture: ComponentFixture<BuscarServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarServicioComponent],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(BuscarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
