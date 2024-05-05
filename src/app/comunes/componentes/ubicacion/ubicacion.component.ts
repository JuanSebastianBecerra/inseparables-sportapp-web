import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UbicacionMaps } from 'src/app/clases/location';
import { LocationService } from 'src/app/servicios/maps/location.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UbicacionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private locationService: LocationService){}

  @Output() onSeleccionarDireccion: EventEmitter<UbicacionMaps> = new EventEmitter();

  ngOnInit(): void {
    this.iniciarFormulario()
    this.locationService.obtenerKeyMaps().subscribe(response => {
      this.mapsKey = response.key
    })
  }
  
  direccionForm!: FormGroup;
  places: UbicacionMaps[] = []
  selectedPlace! : UbicacionMaps
  mostrarDirecciones : boolean = false
  mapsKey : string = ""

  iniciarFormulario() {
    this.direccionForm = this.formBuilder.group({
        direccion: ["", Validators.required]
  })
}

  buscarDireccion(): void{
    this.mostrarDirecciones = true
    if(this.selectedPlace != undefined) this.selectedPlace.id = ""
    let direccionTexto = this.direccionForm.get("direccion")!.value
    if(direccionTexto != ""){
        this.locationService.obtenerUbicacionesPorNombre(direccionTexto, this.mapsKey).subscribe(response =>{
            this.places = []
            if(response.places != undefined){
              response.places.forEach((place: any) => {
                let locationPlace = new UbicacionMaps(place.id, place.formattedAddress, place.location.latitude, place.location.longitude, place.displayName.text)
                this.places.push(locationPlace)
              })
            }
        })
    }else{
        if(this.selectedPlace != undefined) this.selectedPlace.id = ""
        this.mostrarDirecciones = false
    }
    
  }

  seleccionarDireccion(place: UbicacionMaps): void{
    this.selectedPlace = place
    this.mostrarDirecciones = false
    this.direccionForm.patchValue({direccion: this.selectedPlace.nombre})
    this.places = []
    this.onSeleccionarDireccion.emit(this.selectedPlace)
  }

}
