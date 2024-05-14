import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IndicadorRespuesta } from 'src/app/clases/indicador';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionEntrenamientoService {

  private indicadoresUrl = environment.baseUrlDeporte + '/indicadores';


  _buildHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    })
  }

  constructor(private http:HttpClient) { }

  calcularIndicadores(): Observable<IndicadorRespuesta>{
    return this.http.get<IndicadorRespuesta>(this.indicadoresUrl, { headers: this._buildHeaders() });
  }
}
