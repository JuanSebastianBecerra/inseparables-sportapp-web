import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CrearEventoService {

  private serviciossUrl = environment.baseUrlAdministracion + '/evento';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  constructor(private http: HttpClient) { }

  registrarEvento(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.serviciossUrl, bodyRequest, {headers: this.headers});
  }

}