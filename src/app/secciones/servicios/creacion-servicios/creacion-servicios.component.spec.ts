import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionServiciosComponent } from './creacion-servicios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreacionServiciosComponent', () => {
  let component: CreacionServiciosComponent;
  let fixture: ComponentFixture<CreacionServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreacionServiciosComponent, HttpClientTestingModule],
      declarations: []
    });
    fixture = TestBed.createComponent(CreacionServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
