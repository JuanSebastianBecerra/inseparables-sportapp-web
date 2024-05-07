import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenService {

  constructor(private http: HttpClient) { }

  private autorizacionUrl = environment.baseUrlPersonas + '/validar-token';

  validarToken(): boolean{
    const token = localStorage.getItem(TOKEN_KEY)
    let tokenValido = false;
    if (token != ""){
      const respuesta = this.http.post<any>(this.autorizacionUrl, {"token": token});
      respuesta.subscribe(resp => {
        tokenValido = true;
      }, () => {
        tokenValido = false;
      })
    }
    return tokenValido;
  }
}
