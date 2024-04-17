import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DetalleSocio, RespuestaSocio } from 'src/app/clases/detalle-socio';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalleSocio.component.html',
  styleUrls: ['./detalleSocio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent]
})
export class DetalleSocioComponent implements OnInit, AfterViewInit{

  socioForm!: FormGroup;
  responseError: boolean = false;
  responseMessage: String = ""
  socioId!: string;
  detalleSocio: DetalleSocio = {} as DetalleSocio;
  exitoso: boolean = false;


  constructor(private formBuilder: FormBuilder, private socioService: SocioService, 
    private router: Router,private route: ActivatedRoute, private cookieService: CookieService) {
   }

  ngOnInit(): void {
    this.iniciarFormulario()
    
  }

  ngAfterViewInit(){
  }

  get f(): { [key: string]: AbstractControl } {
    return this.socioForm.controls;
  }

  getSocioId(): void{
    this.socioService.getSocioId(this.socioId).subscribe((respuesta) => {
      let respuestaSocio = new RespuestaSocio(respuesta.respuesta, respuesta.token)
      respuestaSocio.setNuevoToken(this.cookieService)

      this.detalleSocio = respuestaSocio.respuesta;
    }, error => { 
      if(error.status === 401){
        this.cookieService.delete("token")
        this.cookieService.delete("rol")
        this.router.navigate(['/'])
      }else{
        this.responseError = true
        if (error.error.description)
          this.responseMessage = error.error.description
        else
          this.responseMessage = "Error al consultar la lista de socios, intente más tarde";
        }
    });
  }

  iniciarFormulario() {
    
    this.socioId = this.route.snapshot.paramMap.get('idSocio')!;
    this.getSocioId()
    this.socioForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      tipo_identificacion: ["", Validators.required],
      numero_identificacion: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      detalle: ["", Validators.required],
    })
       
  }

  actualizarSocio(bodyRequest:any,socioId:any) {
    this.socioService.actualizarSocio(bodyRequest,socioId).subscribe(response => {
        this.exitoso = true
        setTimeout(() => {
          this.router.navigate(['/socios'])
        }, 2000);
    },
    error => {
      this.exitoso=false
      this.responseError = true
      if(error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }

}

