import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlanesService } from 'src/app/servicios/administracion/planes.service';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.css']
})
export class SuscripcionesComponent implements OnInit {

  planes!: [];
  responseError: boolean = false;
  responseMessage: String = ""

  constructor(private http: HttpClient, private planesService: PlanesService){

  }
  ngOnInit(): void {
    this.obtenerPlanes();
  }

  obtenerPlanes():void{
    this.planesService.obtener_planes().subscribe(response => {
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
