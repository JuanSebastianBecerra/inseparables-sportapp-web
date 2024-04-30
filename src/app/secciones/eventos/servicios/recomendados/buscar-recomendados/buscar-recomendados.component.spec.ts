import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRecomendadosComponent } from './buscar-recomendados.component';
import { FormsModule } from '@angular/forms';

describe('BuscarRecomendadosComponent', () => {
  let component: BuscarRecomendadosComponent;
  let fixture: ComponentFixture<BuscarRecomendadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarRecomendadosComponent],
      imports:[FormsModule]
    });
    fixture = TestBed.createComponent(BuscarRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
