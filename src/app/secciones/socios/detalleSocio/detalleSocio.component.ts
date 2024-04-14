import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SocioService } from 'src/app/servicios/socios/socios.service';
import { DetalleSocio } from 'src/app/secciones/socios/detalle-socio';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-detalle-socio',
  templateUrl: './detalleSocio.component.html',
  styleUrls: ['./detalleSocio.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class DetalleSocioComponent implements OnInit, AfterViewInit{

  socioForm!: FormGroup;
  responseError: boolean = false;
  responseMessage: String = ""
  socioId!: string;
  detalleSocio: DetalleSocio = {} as DetalleSocio;
  exitoso: boolean = false;


  constructor(private formBuilder: FormBuilder, private socioService: SocioService, private router: Router,private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.inicarFormulario()
    
  }

  ngAfterViewInit(){
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

  /**public validateAreEqual(c: AbstractControl): { notSame: boolean } | null { 
    return c.value.password === c.value.confirmationPassword ? { notSame: false }: { notSame: true };
  }

  public validateEmpty(c: AbstractControl): { empty: boolean } | null {
    
    if(this.detalleSocio!=undefined){
      return (this.detalleSocio.nombre === "" ||
           this.detalleSocio.apellido === "" ||
           this.detalleSocio.email === "" ||
           this.detalleSocio.tipo_identificacion === "" ||
           this.detalleSocio.username === "" ||
           this.detalleSocio.password === "" ||
           this.detalleSocio.detalle === "")? { empty: true }: { empty: false };
    }else{
      return { empty: false }
    }
    
  }**/

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

