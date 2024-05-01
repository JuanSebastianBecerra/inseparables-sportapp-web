import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router){


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
