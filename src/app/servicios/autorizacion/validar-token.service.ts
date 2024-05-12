import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenService {

  constructor(private http: HttpClient) { }

  private autorizacionUrl = environment.baseUrlPersonas + '/validar-token';

  validarToken(token:string): Observable<any>{
    return this.http.post<any>(this.autorizacionUrl, {"token": token});
  }
}
