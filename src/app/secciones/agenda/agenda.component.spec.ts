import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponent } from './agenda.component';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { Evento, RespuestaEventos } from 'src/app/clases/evento';
import { UbicacionMaps } from 'src/app/clases/location';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date/calendar-date.pipe';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;
  let eventosServicio: EventosService

  const _UBICACION = new UbicacionMaps("1", "Calle", "1", "1", "Calle")
  const _EVENTO = new Evento("1", "evento", "2025-02-01", "3035-03-01", "Detalle eventos", "1", "1", _UBICACION)
  const _RESPUESTA_EVENTOS = new RespuestaEventos([_EVENTO], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaComponent],
      imports: [HttpClientTestingModule,CalendarDatePipe]
    });
    eventosServicio = TestBed.inject(EventosService)
    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get eventos deportista', () => {
    spyOn(eventosServicio, 'getEventosDeportista').and.returnValue(of(_RESPUESTA_EVENTOS))
    component.getEventosDeportista();
    expect(component.eventosDeportista).toEqual([_EVENTO]);
  });

});
