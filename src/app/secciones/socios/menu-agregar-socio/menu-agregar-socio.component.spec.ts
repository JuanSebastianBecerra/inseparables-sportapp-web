import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAgregarSocioComponent } from './menu-agregar-socio.component';

describe('MenuAgregarSocioComponent', () => {
  let component: MenuAgregarSocioComponent;
  let fixture: ComponentFixture<MenuAgregarSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAgregarSocioComponent]
    });
    fixture = TestBed.createComponent(MenuAgregarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
