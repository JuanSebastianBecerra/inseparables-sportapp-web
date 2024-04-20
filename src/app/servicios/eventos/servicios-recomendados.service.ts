import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaServiciosRecomendados } from 'src/app/clases/detalle-servicio-recomendado';

@Injectable({
  providedIn: 'root'
})
export class ServiciosRecomendadosService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.cookieService.get("token")}`
  })

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getServiciosRecomendadosPorEvento(idEvento: string): Observable<RespuestaServiciosRecomendados>{
    const url = `${environment.baseUrlAdministracion}/evento/${idEvento}/servicios`;
    return this.http.get<RespuestaServiciosRecomendados>(url, { headers: this.headers });
  }
}
