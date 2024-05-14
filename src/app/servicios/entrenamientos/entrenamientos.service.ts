import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {TOKEN_KEY} from "../../utils/constants";
import {RespuestaEntrenamientos} from "../../clases/entrenamientos";

@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService{

  private entrenamientosUrl = environment.baseUrlDeporte + '/entrenamientos';
  private guardarEntrenamientoUrl = environment.baseUrlDeporte + '/entrenamiento';
  private tokenStravaUrl = environment.baseUrlStrava;


  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  constructor(private http:HttpClient) { }

  obtenerEntrenamientos(): Observable<RespuestaEntrenamientos>{
    return this.http.get<RespuestaEntrenamientos>(this.entrenamientosUrl, { headers: this._buildHeaders() });
  }

  guardarEntrenamiento(bodyRequest: any): Observable<any>{
    return this.http.post<any>(this.guardarEntrenamientoUrl, bodyRequest, { headers: this._buildHeaders() });
  }

  getTokenStrava(bodyRequest: any): Observable<any>{
    return (this.http.post<any>(this.tokenStravaUrl+"/oauth/token", bodyRequest));
  }

  getId(): Observable<any>{
    let autorizacionUrl = environment.baseUrlPersonas + '/validar-token';
    const token = localStorage.getItem(TOKEN_KEY)
    return (this.http.post<any>(autorizacionUrl, {"token": token}));
  }

  getStravaInfo(idUsuario: String): Observable<any>{
    let autorizacionUrl = environment.baseUrlPersonas + '/'+ idUsuario;
    return (this.http.get<any>(autorizacionUrl, { headers: this._buildHeaders() }));
  }

  syncStrava(access_token: any): Observable<any>{
    return this.http.post<any>(environment.baseUrlDeporte+"/get_strava/"+access_token, null , { headers: this._buildHeaders() });
  }

  addActivityStrava(bodyRequest: any): Observable<any>{
    return this.http.post<any>(environment.baseUrlDeporte+"/add_activity_strava", bodyRequest , { headers: this._buildHeaders() });
  }

}
