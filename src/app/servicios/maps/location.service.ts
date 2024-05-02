import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  private mapsUrlText = environment.baseUrlMaps + "/places:searchText"
  private personasUrlText = environment.baseUrlPersonas + "/maps"

  obtenerKeyMaps(): Observable<any>{
    return this.http.get<any>(this.personasUrlText);
  }

  obtenerUbicacionesPorNombre(nombre: string, key: string): Observable<any>{
    let headers = new HttpHeaders({
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': "*"
    })
    let bodyRequest = {"textQuery": nombre, "maxResultCount": 5}
    return this.http.post<any>(this.mapsUrlText, bodyRequest, { headers: headers });
  }
}
