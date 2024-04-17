import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosComponent } from './socios.component';
import { MenuComponent } from 'src/app/comunes/componentes/menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import {ListaSociosComponent} from "../../socios/listaSocios/listaSocios.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { BuscarSocioComponent } from '../../socios/buscar-socio/buscar-socio.component';
import { MenuAgregarSocioComponent } from '../../socios/menu-agregar-socio/menu-agregar-socio.component';
import { FormsModule } from '@angular/forms';

describe('SociosComponent', () => {
  let component: SociosComponent;
  let fixture: ComponentFixture<SociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, ListaSociosComponent, HttpClientTestingModule, ListaSociosComponent, FormsModule],
      declarations: [SociosComponent, MenuComponent, BuscarSocioComponent, MenuAgregarSocioComponent]
    });
    fixture = TestBed.createComponent(SociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
