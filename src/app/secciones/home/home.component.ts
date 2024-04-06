import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  rol: String = "";
  token: String = "";

  constructor(private router: Router, private cookieService: CookieService){}

  ngOnInit(): void {
    this.token = this.cookieService.get("token")
    this.rol = this.cookieService.get("rol")
    // Si el usuario no está logueado, retorne a la pagina de login
    if (this.token == "" || this.rol == ""){
      this.router.navigate(['/'])
    }
  }
  
}
