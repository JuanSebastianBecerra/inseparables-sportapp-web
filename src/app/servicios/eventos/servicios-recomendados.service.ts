import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaServiciosRecomendados } from 'src/app/clases/detalle-servicio-recomendado';
import { TOKEN_KEY } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ServiciosRecomendadosService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  constructor(private http: HttpClient) { }

  getServiciosRecomendadosPorEvento(idEvento: string): Observable<RespuestaServiciosRecomendados>{
    const url = `${environment.baseUrlAdministracion}/evento/${idEvento}/servicios`;
    return this.http.get<RespuestaServiciosRecomendados>(url, { headers: this.headers });
  }
}
