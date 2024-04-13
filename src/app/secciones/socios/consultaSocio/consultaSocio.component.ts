import { Component, OnInit } from '@angular/core';
import { DetalleSocio } from 'src/app/secciones/socios/detalle-socio';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-socios',
  templateUrl: './consultaSocio.component.html',
  styleUrls: ['./consultaSocio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})


export class ConsultaSocioComponent implements OnInit {

  socios: Array<DetalleSocio> = [];
  selected: boolean = false;
  selectedSociok!: DetalleSocio;

  constructor(
    private socioService: SocioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getSocios() : void {
    this.socioService.getSocios().subscribe((socios) => {
      this.socios = socios;
    });
  }

  ngOnInit() {
        this.getSocios();
  }
}