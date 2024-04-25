import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  private deportesUrl = environment.baseUrlAdministracion + '/deportes';

  constructor(private http: HttpClient) { }

  obtenerDeportes(): Observable<any> {
    return this.http.get<any>(this.deportesUrl, {observe: 'response'});
  }
}
