import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import {AppRoutingModule} from "../../../app-routing.module";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {provideMockStore} from "@ngrx/store/testing";

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [],
      providers: [provideMockStore({})],
    });
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
