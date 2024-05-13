import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaEvento, RespuestaEventos } from 'src/app/clases/evento';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  private eventosUrl = environment.baseUrlAdministracion + '/eventos';

  constructor(private http: HttpClient) { }

  getEventosProximos(): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl, { headers: this.headers })
  }

  getEventosCercanos(): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl+ "-cercanos", { headers: this.headers })
  }

  getEventosDeportista(): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl+ "-deportista", { headers: this.headers })
  }

  getDetalleEvento(idEvento: string): Observable<RespuestaEvento>{
    return this.http.get<RespuestaEvento>(this.eventosUrl+"/"+idEvento, { headers: this.headers })
  }

  getNuevosEventosCercanos(ultimaConexion: number): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl+ "-nuevos/"+ultimaConexion, { headers: this.headers })
  }
}
