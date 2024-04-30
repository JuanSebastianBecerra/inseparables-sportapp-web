import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdministracionService {

    private planesUrl = environment.baseUrlAdministracion + '/plan';
    private paisesUrl = environment.baseUrlAdministracion + '/paises';
    private ciudadesUrl = (codigoPais = '') => environment.baseUrlAdministracion + '/paises/' + codigoPais + '/ciudades';

    constructor(private http: HttpClient) {
    }

    obtenerPlanes(): Observable<any> {
        return this.http.get<any>(this.planesUrl, {observe: 'response'});
    }

    obtenerPaises(): Observable<any> {
        return this.http.get<any>(this.paisesUrl);
    }

    obtenerCiudades(codigoPais = ''): Observable<any> {
        return this.http.get<any>(this.ciudadesUrl(codigoPais));
    }

}
