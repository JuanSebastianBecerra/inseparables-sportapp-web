import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSocioComponent} from './detalleSocio.component';

describe('SocioComponent', () => {
  let component: DetalleSocioComponent;
  let fixture: ComponentFixture<DetalleSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleSocioComponent]
    });
    fixture = TestBed.createComponent(DetalleSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

