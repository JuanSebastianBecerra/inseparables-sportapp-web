import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private serviciossUrl = environment.baseUrlAdministracion + '/producto_servicio';

  constructor(private http: HttpClient) { }

  registrar_servicio(bodyRequest:any): Observable<any> {
    /*const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })*/
    const headers = new HttpHeaders({
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTMwNzA2NTgsImlhdCI6MTcxMzA2OTc1OCwic3ViIjoicGVkcm8ucGVyZXoifQ.fnTJjaSKlEuolbkOYZW-l6PfVXLl8-DiwiOLfol0APs`
    })
    return this.http.post<any>(this.serviciossUrl, bodyRequest, {observe: 'response', headers: headers});
  }
}
