import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionesDisponiblesComponent } from './reuniones-disponibles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';

describe('ReunionesDisponiblesComponent', () => {
  let component: ReunionesDisponiblesComponent;
  let fixture: ComponentFixture<ReunionesDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReunionesDisponiblesComponent],
      imports: [HttpClientTestingModule, ToastComponent]
    });
    fixture = TestBed.createComponent(ReunionesDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
