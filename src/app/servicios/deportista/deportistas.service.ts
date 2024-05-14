import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeportistasService {

  private serviciossUrl = environment.baseUrlAdministracion + '/deportista';

  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  constructor(private http: HttpClient) { }

  asignarServicioADeportista(idServicio: string): Observable<any> {
    return this.http.post<any>(this.serviciossUrl+"/servicio/"+idServicio, "", {headers: this._buildHeaders()});
  }

  asignarEventoAgendaDeportista(idEvento: string): Observable<any> {
    return this.http.post<any>(this.serviciossUrl+"/evento/"+idEvento, "", {headers: this._buildHeaders()});
  }

  eliminarEventoAgendaDeportista(idEvento: string): Observable<any> {
    return this.http.delete<any>(this.serviciossUrl+"/evento/"+idEvento, {headers: this._buildHeaders()});
  }
}
