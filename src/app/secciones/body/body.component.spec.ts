import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyComponent } from './body.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyComponent],
      imports: [AppRoutingModule]
    });
    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "" class when hideMenu is true', () => {
    component.hideMenu = true
    const className = component.getBodyClass()
    expect(className).toEqual("")
  });

  it('should return "body" class when hideMenu is false and collapsed is false', () => {
    component.hideMenu = false
    component.collapsed = false
    const className = component.getBodyClass()
    expect(className).toEqual("body")
  });

  it('should return "body body-trimmed" class when hideMenu is false, collapsed is true and screnwidth is greater than 768', () => {
    component.hideMenu = false
    component.collapsed = true
    component.screenWidth = 800
    const className = component.getBodyClass()
    expect(className).toEqual("body body-trimmed")
  });

  it('should return "body body-md-screen" class when hideMenu is false, collapsed is true and screnwidth is between 0 and 768', () => {
    component.hideMenu = false
    component.collapsed = true
    component.screenWidth = 600
    const className = component.getBodyClass()
    expect(className).toEqual("body body-md-screen")
  });

  it('should return "" class when no conditions are complished', () => {
    component.hideMenu = false
    component.collapsed = true
    component.screenWidth = -1
    const className = component.getBodyClass()
    expect(className).toEqual("")
  });
  
});
