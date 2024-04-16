import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { menubarAdministracionData, menubarDeporteData, menubarConfiguracionData } from './menu-data';

interface MenuNavToggle{
  screenWidth: number;
  collapsed: boolean;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onToggleMenuNav: EventEmitter<MenuNavToggle> = new EventEmitter()
  collapsed = false;
  screenWidth = 0;
  menubarAdministracionData = menubarAdministracionData
  menubarDeporteData = menubarDeporteData
  menubarConfiguracionData = menubarConfiguracionData

  ngOnInit() : void {
    this.screenWidth = window.innerWidth;
  }

  toogleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleMenuNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeMenunav(): void{
    this.collapsed = false;
    this.onToggleMenuNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

}
