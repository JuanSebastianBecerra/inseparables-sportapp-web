import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarReunionesComponent } from './consultar-reuniones.component';
import { ReunionesDisponiblesComponent } from '../reuniones-dispobibles/reuniones-disponibles.component';
import { BuscarReunionesComponent } from '../buscar-reuniones/buscar-reuniones.component'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { FormsModule } from '@angular/forms';

describe('ConsultarReunionesComponent', () => {
  let component: ConsultarReunionesComponent;
  let fixture: ComponentFixture<ConsultarReunionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarReunionesComponent, BuscarReunionesComponent, ReunionesDisponiblesComponent],
      imports: [HttpClientTestingModule, ToastComponent, FormsModule]
    });
    fixture = TestBed.createComponent(ConsultarReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
