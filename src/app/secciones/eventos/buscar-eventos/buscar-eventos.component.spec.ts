import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEventosComponent } from './buscar-eventos.component';

describe('BuscarEventosComponent', () => {
  let component: BuscarEventosComponent;
  let fixture: ComponentFixture<BuscarEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarEventosComponent]
    });
    fixture = TestBed.createComponent(BuscarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
