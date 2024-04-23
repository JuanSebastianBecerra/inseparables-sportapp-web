import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenamientosComponent } from './entrenamientos.component';
import {BuscarEntrenamientoComponent} from "./buscar-entrenamiento/buscar-entrenamiento.component";
import {ListaEntrenamientosComponent} from "./lista-entrenamientos/lista-entrenamientos.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

describe('EntrenamientosComponent', () => {
  let component: EntrenamientosComponent;
  let fixture: ComponentFixture<EntrenamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrenamientosComponent, BuscarEntrenamientoComponent],
      imports: [ListaEntrenamientosComponent, HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(EntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
