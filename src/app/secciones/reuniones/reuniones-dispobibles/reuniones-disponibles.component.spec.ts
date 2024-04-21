/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReunionesDisponiblesComponent } from './reuniones-disponibles.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";

describe('ReunionesDisponiblesComponent', () => {
  let component: ReunionesDisponiblesComponent;
  let fixture: ComponentFixture<ReunionesDisponiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReunionesDisponiblesComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionesDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
