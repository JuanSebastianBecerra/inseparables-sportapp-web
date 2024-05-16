import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UbicacionMaps, DireccionDeportista } from 'src/app/clases/location';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private registroUrl = environment.baseUrlPersonas + '/usuario';
  private registroPerfilDeportivoUrl = environment.baseUrlPersonas + '/perfildeportivo';
  private direccionUrl = environment.baseUrlPersonas + "/persona/direccion"

  constructor(private http: HttpClient) { }

  registrarUsuario(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.registroUrl, bodyRequest, {observe: 'response'});
  }

  registrarPerfilDeportivo(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.registroPerfilDeportivoUrl, bodyRequest, {observe: 'response'});
  }

  getDireccionUsuario(): Observable<DireccionDeportista>{
    const headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`})
    return this.http.get<DireccionDeportista>(this.direccionUrl, {headers: headers})
  }

}
