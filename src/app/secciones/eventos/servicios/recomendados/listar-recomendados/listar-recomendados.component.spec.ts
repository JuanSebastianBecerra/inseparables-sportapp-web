import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecomendadosComponent } from './listar-recomendados.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ListarRecomendadosComponent', () => {
  let component: ListarRecomendadosComponent;
  let fixture: ComponentFixture<ListarRecomendadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ListarRecomendadosComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(ListarRecomendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
