import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarServicioComponent } from './listar-servicio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';

describe('ListarServicioComponent', () => {
  let component: ListarServicioComponent;
  let fixture: ComponentFixture<ListarServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarServicioComponent],
      imports: [HttpClientTestingModule, ToastComponent]
    });
    fixture = TestBed.createComponent(ListarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
