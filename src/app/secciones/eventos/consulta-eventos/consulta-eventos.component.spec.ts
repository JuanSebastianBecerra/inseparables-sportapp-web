import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEventosComponent } from './consulta-eventos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuscarEventosComponent } from '../buscar-eventos/buscar-eventos.component';
import {TranslateModule} from "@ngx-translate/core";
import { ListarEventosComponent } from '../listar-eventos/listar-eventos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BotonCrearEventoComponent } from '../boton-crear-evento/boton-crear-evento.component';

describe('ConsultaEventosComponent', () => {
  let component: ConsultaEventosComponent;
  let fixture: ComponentFixture<ConsultaEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaEventosComponent, BotonCrearEventoComponent],
      imports: [FormsModule, ReactiveFormsModule, BuscarEventosComponent, ListarEventosComponent, 
        HttpClientTestingModule, TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(ConsultaEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
