import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaServiciosComponent } from './consulta-servicios.component';
import { ListarServicioComponent } from '../listar-servicio/listar-servicio.component';
import { BuscarServicioComponent } from '../buscar-servicio/buscar-servicio.component';
import { MenuAgregarServicioComponent } from '../menu-agregar-servicio/menu-agregar-servicio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { FormsModule } from '@angular/forms';

describe('ConsultaServiciosComponent', () => {
  let component: ConsultaServiciosComponent;
  let fixture: ComponentFixture<ConsultaServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaServiciosComponent, BuscarServicioComponent, MenuAgregarServicioComponent, ListarServicioComponent],
      imports: [HttpClientTestingModule, ToastComponent, FormsModule]
    });
    fixture = TestBed.createComponent(ConsultaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
