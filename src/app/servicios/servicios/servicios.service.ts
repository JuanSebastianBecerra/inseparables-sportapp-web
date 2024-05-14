import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { RespuestaServicios, RespuestaServicio } from 'src/app/clases/servicios';
import { TOKEN_KEY } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private serviciossUrl = environment.baseUrlAdministracion + '/producto_servicio';

  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  constructor(private http: HttpClient) { }

  registrarServicio(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.serviciossUrl, bodyRequest, {headers: this._buildHeaders()});
  }

  obtenerServicios(): Observable<RespuestaServicios> {
    return this.http.get<RespuestaServicios>(this.serviciossUrl, {headers: this._buildHeaders()})
  }

  obtenerServicioPorId(idServicio: String): Observable<RespuestaServicio>{
    return this.http.get<RespuestaServicio>(this.serviciossUrl+"/"+idServicio, {headers: this._buildHeaders()})
  }
}
