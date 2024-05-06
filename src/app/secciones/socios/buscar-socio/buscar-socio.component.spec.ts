import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarSocioComponent } from './buscar-socio.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

describe('BuscarSocioComponent', () => {
  let component: BuscarSocioComponent;
  let fixture: ComponentFixture<BuscarSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarSocioComponent],
      imports:[FormsModule, TranslateModule.forRoot()]
    })
    fixture = TestBed.createComponent(BuscarSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
