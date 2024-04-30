import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaSocio, RespuestaSocios } from 'src/app/clases/detalle-socio';
import { TOKEN_KEY } from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class SocioService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  private socioUrl = environment.baseUrlAdministracion + '/socio';

  constructor(private http: HttpClient) { }

  registrarSocio(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.socioUrl, bodyRequest, { headers: this.headers });
  }

  actualizarSocio(bodyRequest:any,socioId:any): Observable<any> {
    return this.http.post<any>(`${this.socioUrl}/${socioId}`, bodyRequest);
  }

  getSocioId(socioId: string): Observable<RespuestaSocio>{
    const url = `${environment.baseUrlAdministracion}/socios/${socioId}`;
    return this.http.get<RespuestaSocio>(url, { headers: this.headers });    
  }

  getSocios(): Observable<RespuestaSocios> {
    const url = `${environment.baseUrlAdministracion}/socios`;
    return this.http.get<RespuestaSocios>(url, { headers: this.headers })
  }
}
