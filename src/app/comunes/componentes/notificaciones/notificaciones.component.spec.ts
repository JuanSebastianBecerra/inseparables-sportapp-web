import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesComponent } from './notificaciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { UbicacionMaps } from 'src/app/clases/location';
import { Evento, RespuestaEventos } from 'src/app/clases/evento';
import { Subject, of } from 'rxjs';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { ULTIMA_CONEXION_KEY } from 'src/app/utils/constants';

const routerEventsSubject = new Subject<RouterEvent>();

const routerStub = {
    events: routerEventsSubject.asObservable(),
    url: "/socios"
};

describe('NotificacionesComponent', () => {
  let component: NotificacionesComponent;
  let fixture: ComponentFixture<NotificacionesComponent>;
  let eventosService: EventosService
  let router: Router

  const _UBICACION = new UbicacionMaps("1", "Calle", "1", "1", "Calle")
  const _EVENTO = new Evento("1", "evento", "2025-02-01", "3035-03-01", "Detalle eventos", "1", "1", _UBICACION)
  const _RESPUESTA_EVENTOS = new RespuestaEventos([_EVENTO], "1234567890")

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
            provide: Router,
            useValue: routerStub
        }
    ],
    teardown: {destroyAfterEach: false}
    });
    
    fixture = TestBed.createComponent(NotificacionesComponent);
    component = fixture.componentInstance;
    eventosService = TestBed.inject(EventosService)
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should llamar eventos', () => {
    localStorage.setItem(ULTIMA_CONEXION_KEY, "1")
    routerEventsSubject.next(new NavigationStart(1, 'socios'));
    spyOn(eventosService, 'getNuevosEventosCercanos').and.returnValue(of(_RESPUESTA_EVENTOS))
    expect(component.nuevasNotificaciones).toBeFalse()
  })
});
