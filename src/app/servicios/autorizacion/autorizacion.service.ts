import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private autorizacionUrl = environment.baseUrlPersonas + '/ingresar';

  constructor(private http: HttpClient) { }

  doLogin(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.autorizacionUrl, bodyRequest);
  }

}
