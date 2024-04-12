import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DetalleSocio } from 'src/app/secciones/socios/detalle-socio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalleSocio.component.html',
  styleUrls: ['./detalleSocio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class DetalleSocioComponent implements OnInit {

  socioForm!: FormGroup;
  responseError: boolean = false;
  responseMessage: String = ""
  socioId!: string;
  detalleSocio: DetalleSocio = {} as DetalleSocio;

  constructor(private formBuilder: FormBuilder, private socioService: SocioService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.inicarFormulario()
  }

  get f(): { [key: string]: AbstractControl } {
    return this.socioForm.controls;
  }

  getSocioId(): void{
    this.socioService.getSocioId(this.socioId).subscribe((detalleSocio) => {
      this.detalleSocio = detalleSocio;
    });
  }

  inicarFormulario() {
    
    this.socioId = this.route.snapshot.paramMap.get('idSocio')!;
    this.getSocioId()
    this.socioForm = this.formBuilder.group({
      email: [this.detalleSocio.email, [Validators.required, Validators.email]],
      nombre: [this.detalleSocio.nombre, Validators.required],
      apellido: [this.detalleSocio.apellido, Validators.required],
      tipo_identificacion: [this.detalleSocio.tipo_identificacion, Validators.required],
      numero_identificacion: [this.detalleSocio.numero_identificacion, Validators.required],
      username: [this.detalleSocio.username, Validators.required],
      password: [this.detalleSocio.password, Validators.required],
      detalle: [this.detalleSocio.detalle],
    })
  }

  actualizarSocio(bodyRequest:any,socioId:any) {
    
    this.socioService.actualizarSocio(bodyRequest,socioId).subscribe(response => {
        this.router.navigate(['/home'])
    },
    error => {
      this.responseError = true
      if(error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }

}

