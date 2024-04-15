import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private serviciossUrl = environment.baseUrlAdministracion + '/producto_servicio';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registrar_servicio(bodyRequest:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get("token")}`
    })
    return this.http.post<any>(this.serviciossUrl, bodyRequest, {observe: 'response', headers: headers});
  }
}
