import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TOKEN_KEY } from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class PlanService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
  })

  private planUrl = environment.baseUrlDeporte + '/plan-entrenamiento';

  constructor(private http: HttpClient) { }

  registrarPlan(bodyRequest:any): Observable<any> {
    return this.http.post<any>(this.planUrl, bodyRequest, { headers: this.headers });
  }

}
