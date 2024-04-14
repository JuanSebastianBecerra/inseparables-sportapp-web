import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetalleSocio } from 'src/app/secciones/socios/detalle-socio';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.cookieService.get("token")}`
  })

  private socioUrl = environment.baseUrlAdministracion + '/socio';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registrarSocio(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.socioUrl, bodyRequest, { headers: this.headers });
  }

  actualizarSocio(bodyRequest:any,socioId:any): Observable<any> {
    return this.http.post<any>(`${this.socioUrl}/${socioId}`, bodyRequest);
  }

  getSocioId(socioId: string): Observable<DetalleSocio>{
    const url = `${environment.baseUrlAdministracion}/socios/${socioId}`;
    return this.http.get<DetalleSocio>(url, { headers: this.headers });    
  }

  getSocios(): Observable<DetalleSocio[]> {
    const url = `${environment.baseUrlAdministracion}/socios`;
    return this.http.get<DetalleSocio[]>(url, { headers: this.headers })
  }
}
