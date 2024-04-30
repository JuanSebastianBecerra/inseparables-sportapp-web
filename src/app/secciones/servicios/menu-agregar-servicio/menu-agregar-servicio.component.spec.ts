import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAgregarServicioComponent } from './menu-agregar-servicio.component';

describe('MenuAgregarServicioComponent', () => {
  let component: MenuAgregarServicioComponent;
  let fixture: ComponentFixture<MenuAgregarServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAgregarServicioComponent]
    });
    fixture = TestBed.createComponent(MenuAgregarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
