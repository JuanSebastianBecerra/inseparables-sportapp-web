import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from "@ngx-translate/core";
import { BuscarEventosComponent } from './buscar-eventos.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('BuscarEventosComponent', () => {
  let component: BuscarEventosComponent;
  let fixture: ComponentFixture<BuscarEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [BuscarEventosComponent, ReactiveFormsModule, TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(BuscarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
