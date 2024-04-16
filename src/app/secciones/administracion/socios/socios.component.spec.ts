import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosComponent } from './socios.component';
import { MenuComponent } from 'src/app/comunes/componentes/menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import {ListaSociosComponent} from "../../socios/listaSocios/listaSocios.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SociosComponent', () => {
  let component: SociosComponent;
  let fixture: ComponentFixture<SociosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, ListaSociosComponent, HttpClientTestingModule],
      declarations: [SociosComponent, MenuComponent]
    });
    fixture = TestBed.createComponent(SociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
