import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private planesUrl = environment.baseUrlAdministracion + '/plan';

  constructor(private http: HttpClient) { }

  obtener_planes(): Observable<any> {
    return this.http.get<any>(this.planesUrl, {withCredentials: true, observe: 'response'});
  }
}
