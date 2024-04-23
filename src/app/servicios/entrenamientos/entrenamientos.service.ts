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

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  constructor(private http:HttpClient) { }

  obtenerEntrenamientos(): Observable<RespuestaEntrenamientos>{
    return this.http.get<RespuestaEntrenamientos>(this.entrenamientosUrl, { headers: this.headers });
  }

}
