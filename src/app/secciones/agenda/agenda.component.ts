import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Evento, RespuestaEventos } from 'src/app/clases/evento';
import { EventosService } from 'src/app/servicios/eventos/eventos.service';
import { Router } from '@angular/router';

const colors: Record<string, EventColor> = {
  "red": {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  "blue": {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  "yellow": {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  "bluegreen7": {
    primary: '#36c4c1',
    secondary: '#36c4c1'
  }

};

const getRandomElement = (arr: any[]) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'agenda.component.html',
})
export class AgendaComponent  {


  
  @ViewChild('modalContent', { static: true }) 
  
  modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  
  eventosDeportista: Evento[] = []
  events: CalendarEvent[] = []

  mostrarError: boolean = false
  errorMensaje: string = ""

  idColors: string[] = ['red','blue','yellow','bluegreen7']

  consultaEventos = false;

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  
  refresh = new Subject<void>();


  activeDayIsOpen: boolean = true;


  constructor(private modal: NgbModal,private eventosServicio: EventosService, private router: Router ){
    this.getEventosDeportista()
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }




  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  
  getEventosDeportista(): void{ 
    this.eventosServicio.getEventosDeportista().subscribe(respuesta => {
      let eventosDeportistaRespuesta = new RespuestaEventos(respuesta.respuesta, respuesta.token)
      eventosDeportistaRespuesta.setNuevoToken()
      this.eventosDeportista = eventosDeportistaRespuesta.respuesta;
      this.setEventosAgenda()
      this.consultaEventos=true
      
    }, error => { 
      this.consultaEventos=true
      if(error.status === 401){
        localStorage.clear()
        this.router.navigate(['/'])
      }else{
        this.mostrarError = true
        if (error.error.description)
          this.errorMensaje = error.error.description
        else
          this.errorMensaje = "Error al consultar la lista de eventos del deportista, intente más tarde";
        }
    })
  }

  setEventosAgenda():void {
        this.events =[] 

        for (var index in  this.eventosDeportista) {
          var evt = this.eventosDeportista[index];
          this.events.push(
            {
              start: new Date(evt.fecha_inicio),
              end: new Date(evt.fecha_fin),
              title: new Date(evt.fecha_inicio).getHours()+':'+new Date(evt.fecha_inicio).getMinutes() +'  -  '+new Date(evt.fecha_fin).getHours()+':'+new Date(evt.fecha_fin).getMinutes()+'   '+evt.nombre,
              color: { ...colors[getRandomElement(this.idColors)] }
            },

          )
        }

  }


 
}
