import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendadosComponent } from './recomendados.component';
import { ListarRecomendadosComponent } from './listar-recomendados/listar-recomendados.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BuscarRecomendadosComponent } from './buscar-recomendados/buscar-recomendados.component';
import { MenuComponent } from 'src/app/comunes/componentes/menu/menu.component';

describe('RecomendadosComponent', () => {
  let component: RecomendadosComponent;
  let fixture: ComponentFixture<RecomendadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, ListarRecomendadosComponent, HttpClientTestingModule, FormsModule],
      declarations: [RecomendadosComponent, MenuComponent, BuscarRecomendadosComponent]
    });
    fixture = TestBed.createComponent(RecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
