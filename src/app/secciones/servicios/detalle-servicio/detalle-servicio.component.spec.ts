import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleServicioComponent } from './detalle-servicio.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('DetalleServicioComponent', () => {
  let component: DetalleServicioComponent;
  let fixture: ComponentFixture<DetalleServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetalleServicioComponent, HttpClientTestingModule, AppRoutingModule]
    });
    fixture = TestBed.createComponent(DetalleServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
