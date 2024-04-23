import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntrenamientosComponent } from './lista-entrenamientos.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";

describe('ListaEntrenamientosComponent', () => {
  let component: ListaEntrenamientosComponent;
  let fixture: ComponentFixture<ListaEntrenamientosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ListaEntrenamientosComponent, HttpClientTestingModule, ToastComponent]
    });
    fixture = TestBed.createComponent(ListaEntrenamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
