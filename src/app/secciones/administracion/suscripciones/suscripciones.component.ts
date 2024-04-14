import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion/administracion.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  planes!: [];
  responseError: boolean = false;
  responseMessage: String = ""

  constructor(private http: HttpClient, private administracionService: AdministracionService){

  }
  ngOnInit(): void {
    this.obtenerPlanes();
  }

  obtenerPlanes():void{
    this.administracionService.obtenerPlanes().subscribe(response => {
      this.planes = response.body;
    },
    error => {
      this.responseError = true
      if (error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }

}
