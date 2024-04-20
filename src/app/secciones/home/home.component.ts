import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router"
import { ROL_KEY, TOKEN_KEY } from 'src/app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  rol: String = "";
  token: String = "";

  constructor(private router: Router){}

  ngOnInit(): void {
    this.token = localStorage.getItem(TOKEN_KEY)!
    this.rol = localStorage.getItem(ROL_KEY)!
    // Si el usuario no está logueado, retorne a la pagina de login
    if (this.token == "" || this.rol == ""){
      this.router.navigate(['/'])
    }
  }
  
}
