import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
      TranslateModule.forRoot()],
    declarations: [AppComponent]
  })});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app without navigator', () => {
    Object.defineProperty(navigator, 'language', {
      get: function() {return undefined;}
  });
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
