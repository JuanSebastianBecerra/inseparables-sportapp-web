import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaEvento, RespuestaEventos } from 'src/app/clases/evento';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  private eventosUrl = environment.baseUrlAdministracion + '/eventos';

  constructor(private http: HttpClient) { }

  getEventosProximos(): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl, { headers: this._buildHeaders() })
  }

  getEventosCercanos(latitud: string, longitud: string): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl+ "-cercanos", { headers: this._buildHeaders(), params: {"latitud": latitud, "longitud": longitud} })
  }

  getEventosDeportista(): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl+ "-deportista", { headers: this._buildHeaders() })
  }

  getDetalleEvento(idEvento: string): Observable<RespuestaEvento>{
    return this.http.get<RespuestaEvento>(this.eventosUrl+"/"+idEvento, { headers: this._buildHeaders() })
  }

  getNuevosEventosCercanos(ultimaConexion: number, latitud: string, longitud: string): Observable<RespuestaEventos>{
    return this.http.get<RespuestaEventos>(this.eventosUrl+ "-nuevos/"+ultimaConexion, { headers: this._buildHeaders(), params: {"latitud": latitud, "longitud": longitud}})
  }
}
