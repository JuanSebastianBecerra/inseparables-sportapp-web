import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() hideMenu = false;

  getBodyClass(): string {
    let styleClass = "";
    if (this.hideMenu){
      return "";
    }
    if (!this.collapsed){
      return "body";
    }
    if(this.collapsed && this.screenWidth > 768){
      styleClass = "body body-trimmed";
    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0){
      styleClass = "body body-md-screen"
    }
    return styleClass
  }

}
