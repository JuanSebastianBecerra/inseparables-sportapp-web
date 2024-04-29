import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  constructor(private router : Router){}

  verServiciosPorEvento(): void { //TODO esto hay que quitarlo en la historia SPR-60
    this.router.navigate(['/eventos/' + environment.eventoId + "/servicios"])
  }
}
