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

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  obtenerPlanes(): Observable<PlanesRespuesta>{
    return this.http.get<PlanesRespuesta>(this.planesUrl, { headers: this.headers });
  }

  obtenerPlanesPorDeportista(): Observable<PlanesRespuesta>{
    return this.http.get<PlanesRespuesta>(this.planesUrl+"/deportista", { headers: this.headers });
  }

  obtenerEntrenamientosPorPlan(idPlan: string): Observable<PlanesEntrenamientoRespuesta>{
    return this.http.get<PlanesEntrenamientoRespuesta>(this.planesUrl + "/" + idPlan, { headers: this.headers })
  }

  asignarPlanDeportista(idPlan: string): Observable<any>{
    return this.http.post<any>(this.planesUrl + "/" + idPlan + "/deportista", "", { headers: this.headers })
  }

  removerPlanDeportista(idPlan: string): Observable<any>{
    return this.http.delete<any>(this.planesUrl + "/" + idPlan + "/deportista", { headers: this.headers })
  }
}
