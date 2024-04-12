import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/menuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems: Array<MenuItem> = [];
  itemSeleccionado: String = "";

  constructor(private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.route.url.subscribe(([url]) => {
      const { path, parameters } = url;
      this.itemSeleccionado = path
    });
    this.crearMenu()
  }

  private crearMenu():void {
    this.menuItems = [{
      descripcion: "Administración",
      llave: "admin",
      icon: "",
      esTitulo: true,
      esSeparador: false
    },
    {
      descripcion: "Socios de negocio",
      llave: "socios",
      icon: "bi bi-briefcase-fill",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "Servicios - Productos",
      llave: "servicios",
      icon: "bi bi-card-checklist",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "Eventos",
      llave: "eventos",
      icon: "bi bi-calendar2-event",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "",
      llave: "",
      icon: "",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "",
      llave: "",
      icon: "",
      esTitulo: false,
      esSeparador: true
    },
    {
      descripcion: "Deporte",
      llave: "deporte",
      icon: "",
      esTitulo: true,
      esSeparador: false
    },
    {
      descripcion: "Deportistas",
      llave: "deportistas",
      icon: "bi bi-person-arms-up",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "Entrenamientos",
      llave: "entrenamientos",
      icon: "bi bi-person-lines-fill",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "",
      llave: "",
      icon: "",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "",
      llave: "",
      icon: "",
      esTitulo: false,
      esSeparador: true
    },
    {
      descripcion: "Configuración",
      llave: "configuracion",
      icon: "",
      esTitulo: true,
      esSeparador: false
    },
    {
      descripcion: "Mi perfil",
      llave: "perfil",
      icon: "bi bi-person-circle",
      esTitulo: false,
      esSeparador: false
    },
    {
      descripcion: "Cerrar sesión",
      llave: "cerrar",
      icon: "bi bi-box-arrow-left",
      esTitulo: false,
      esSeparador: false
    }]
  }

}
