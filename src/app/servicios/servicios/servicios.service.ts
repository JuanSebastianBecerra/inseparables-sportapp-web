import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RespuestaServicios, RespuestaServicio } from 'src/app/clases/servicios';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private serviciossUrl = environment.baseUrlAdministracion + '/producto_servicio';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.cookieService.get("token")}`
  })

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registrarServicio(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.serviciossUrl, bodyRequest, {headers: this.headers});
  }

  obtenerServicios(): Observable<RespuestaServicios> {
    return this.http.get<RespuestaServicios>(this.serviciossUrl, {headers: this.headers})
  }

  obtenerServicioPorId(idServicio: String): Observable<RespuestaServicio>{
    return this.http.get<RespuestaServicio>(this.serviciossUrl+"/"+idServicio, {headers: this.headers})
  }
}
