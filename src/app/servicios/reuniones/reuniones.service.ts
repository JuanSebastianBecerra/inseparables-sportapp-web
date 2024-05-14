import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaReuniones } from 'src/app/clases/reunion';
import { TOKEN_KEY } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {

  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  constructor(private http: HttpClient) { }

  getReunionesDisponibles(): Observable<RespuestaReuniones> {
    const url = `${environment.baseUrlAdministracion}/reuniones/disponibles`;
    return this.http.get<RespuestaReuniones>(url, { headers: this._buildHeaders() })
  }

  agendarSesion(id: string): Observable<any> {
    const url = `${environment.baseUrlAdministracion}/reunion/`+id;
    return this.http.post<any>(url, "",{ headers: this._buildHeaders()});
  }
}

