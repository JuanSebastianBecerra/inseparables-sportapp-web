import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanesEntrenamientoRespuesta, PlanesRespuesta } from 'src/app/clases/plan-entrenamiento';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(private http : HttpClient) { }

  private planesUrl =  environment.baseUrlDeporte + '/planes-entrenamiento';  

  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  obtenerPlanes(): Observable<PlanesRespuesta>{
    return this.http.get<PlanesRespuesta>(this.planesUrl, { headers: this._buildHeaders() });
  }

  obtenerPlanesPorDeportista(): Observable<PlanesRespuesta>{
    return this.http.get<PlanesRespuesta>(this.planesUrl+"/deportista", { headers: this._buildHeaders() });
  }

  obtenerEntrenamientosPorPlan(idPlan: string): Observable<PlanesEntrenamientoRespuesta>{
    return this.http.get<PlanesEntrenamientoRespuesta>(this.planesUrl + "/" + idPlan, { headers: this._buildHeaders() })
  }

  asignarPlanDeportista(idPlan: string): Observable<any>{
    return this.http.post<any>(this.planesUrl + "/" + idPlan + "/deportista", "", { headers: this._buildHeaders() })
  }

  removerPlanDeportista(idPlan: string): Observable<any>{
    return this.http.delete<any>(this.planesUrl + "/" + idPlan + "/deportista", { headers: this._buildHeaders() })
  }
}
