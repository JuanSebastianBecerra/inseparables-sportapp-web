import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private registroUrl = environment.baseUrlPersonas + '/usuario';

  constructor(private http: HttpClient) { }

  registrarUsuario(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.registroUrl, bodyRequest, {withCredentials: true});
  }
}
