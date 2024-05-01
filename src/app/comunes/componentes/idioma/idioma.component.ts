import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent {

  idiomas = ['es','en'];

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.idiomas);
    this.translateService.setDefaultLang(this.idiomas[0]);
  }

  seleccionarLenguage(lenguaje: string): void{
    this.translateService.use(lenguaje)
  }

}
