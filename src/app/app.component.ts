import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface MenuNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inseparables-sportapp-web';
  constructor(private translateService: TranslateService, private router: Router){
    const userLanguage = navigator.language || 'es';
    const languageCode = userLanguage.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);

    router.events.subscribe((val) => {
      this.hideMenu = this.router.url == "/" || 
                    this.router.url == "/registro" || 
                    this.router.url == "/suscripciones" || 
                    this.router.url == "/perfil-deportista"
    })
  }

  isMenuNavCollapsed = false;
  screenWidth = 0;
  hideMenu = this.router.url == "/" 

  onToggleMenuNav(data: MenuNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isMenuNavCollapsed = data.collapsed;
  }
}
