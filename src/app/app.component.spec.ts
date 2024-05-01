import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { BodyComponent } from './secciones/body/body.component';
import {IdiomaComponent} from "./comunes/componentes/idioma/idioma.component";

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
      TranslateModule.forRoot()],
    declarations: [AppComponent, BodyComponent, IdiomaComponent]
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
