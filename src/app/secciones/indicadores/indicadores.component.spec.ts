import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresComponent } from './indicadores.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SesionEntrenamientoService } from 'src/app/servicios/sesion_entrenamiento/sesionEntrenamiento.service';
import { Indicador, IndicadorRespuesta } from 'src/app/clases/indicador';
import { of } from 'rxjs';

describe('IndicadoresComponent', () => {
  let component: IndicadoresComponent;
  let fixture: ComponentFixture<IndicadoresComponent>;
  let servicioEntrenamientoService: SesionEntrenamientoService

  const _INDICADOR = new Indicador("2024-05-02 04:57:00 P.M.", 100, 100)
  const _RESPUESTA_INDICADORES = new IndicadorRespuesta([_INDICADOR], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadoresComponent],
      imports:[HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(IndicadoresComponent);
    component = fixture.componentInstance;
    servicioEntrenamientoService = TestBed.inject(SesionEntrenamientoService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load indicadores', () => {
    spyOn(servicioEntrenamientoService, 'calcularIndicadores').and.returnValue(of(_RESPUESTA_INDICADORES))
    component.consultarIndicadores()
    expect(component.indicadores.length).toBeGreaterThan(0)
    expect(component.pages).toEqual(1)
  });

  it('should funcion siguiente página', () => {
    component.indicadoresPaginados.set(0, [_INDICADOR])
    component.indicadoresPaginados.set(1, [_INDICADOR])
    component.paginaActiva = 0
    component.siguientePagina()
    expect(component.paginaActiva).toEqual(1)
    component.siguientePagina()
    expect(component.paginaActiva).toEqual(1)
  });

  it('should funcion retroceder página', () => {
    component.indicadoresPaginados.set(0, [_INDICADOR])
    component.indicadoresPaginados.set(1, [_INDICADOR])
    component.paginaActiva = 1
    component.retrocederPagina()
    expect(component.paginaActiva).toEqual(0)
    component.retrocederPagina()
    expect(component.paginaActiva).toEqual(0)
  });

});
