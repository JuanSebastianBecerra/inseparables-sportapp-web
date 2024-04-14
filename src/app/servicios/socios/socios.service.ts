import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetalleSocio } from 'src/app/secciones/socios/detalle-socio';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private socioUrl = environment.baseUrlAdministracion + '/socio';

  constructor(private http: HttpClient) { }

  registrarSocio(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.socioUrl, bodyRequest);
  }

  actualizarSocio(bodyRequest:any,socioId:any): Observable<any> {
    return this.http.post<any>(`${this.socioUrl}/${socioId}`, bodyRequest);
  }

  getSocioId(socioId: string): Observable<DetalleSocio>{
    const url = `${environment.baseUrlAdministracion}/socios/${socioId}`;
    return this.http.get<DetalleSocio>(url);
  }

  getSocios(): Observable<DetalleSocio[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    const url = `${environment.baseUrlAdministracion}/socios`;
    return this.http.get<DetalleSocio[]>(url, { headers: headers })
  }
}
