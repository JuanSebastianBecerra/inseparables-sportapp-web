import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeportesService {

  private deportesUrl = environment.baseUrlAdministracion + '/deportes';

  constructor(private http: HttpClient) { }

  obtener_deportes(): Observable<any> {
    return this.http.get<any>(this.deportesUrl, {observe: 'response'});
  }
}
