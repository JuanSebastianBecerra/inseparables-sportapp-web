import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSociosComponent } from './listaSocios.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppRoutingModule} from "../../../app-routing.module";

describe('ListaSociosComponent', () => {
  let component: ListaSociosComponent;
  let fixture: ComponentFixture<ListaSociosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ListaSociosComponent, HttpClientTestingModule, AppRoutingModule],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
