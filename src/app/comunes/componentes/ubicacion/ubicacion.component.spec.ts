import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from "@ngx-translate/core";
import { UbicacionComponent } from './ubicacion.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UbicacionMaps } from 'src/app/clases/location';
import { LocationService } from 'src/app/servicios/maps/location.service';
import { of } from 'rxjs';

describe('UbicacionComponent', () => {
  let component: UbicacionComponent;
  let fixture: ComponentFixture<UbicacionComponent>;
  let locationService : LocationService

  const _PLACES = [
    {"id": "1", "formattedAddress": "Calle 134", "location": {"latitude": "1", "longitude": "1"}, "displayName": {"text": "direccion"}}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UbicacionComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: []
    });
    fixture = TestBed.createComponent(UbicacionComponent);
    locationService = TestBed.inject(LocationService)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should buscar direccion', () => {
    let mockPlace = new UbicacionMaps("1", "Calle", "1", "1", "Calle")
    component.seleccionarDireccion(mockPlace)
    expect(component.places.length).toBe(0);
    spyOn(locationService, 'obtenerUbicacionesPorNombre').and.returnValue(of({"places": _PLACES}))
    component.buscarDireccion();
    expect(component.places.length).toBeGreaterThan(0);
  });
});
