import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaComponent } from './idioma.component';
import {TranslateModule} from "@ngx-translate/core";

describe('IdiomaComponent', () => {
  let component: IdiomaComponent;
  let fixture: ComponentFixture<IdiomaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(),],
      declarations: [IdiomaComponent]
    });
    fixture = TestBed.createComponent(IdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
