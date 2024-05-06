import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReunionesComponent } from './buscar-reuniones.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

describe('BuscarReunionesComponent', () => {
  let component: BuscarReunionesComponent;
  let fixture: ComponentFixture<BuscarReunionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarReunionesComponent],
      imports:[FormsModule, TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(BuscarReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
