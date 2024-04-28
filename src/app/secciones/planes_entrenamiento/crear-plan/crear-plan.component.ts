import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DeportesService } from 'src/app/servicios/deporte/deportes.service';
import { EntrenamientosService } from 'src/app/servicios/entrenamientos/entrenamientos.service';
import { PlanService } from 'src/app/servicios/planes_entrenamiento/plan.service';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { DetalleEntrenamiento, RespuestaEntrenamientos } from 'src/app/clases/entrenamientos';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent]
})
export class CrearPlanComponent implements OnInit {

  planForm!: FormGroup;
  responseError: boolean = false;
  responseMessage: String = ""
  exitoso = false
  deportes: any[] = []
  entrenamientos: any[] = []
  all_selected_values: any[] = [];

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router,
              private deportesService: DeportesService, private entrenamientoService: EntrenamientosService) { }

  ngOnInit(): void {
    this.inicarFormulario()
    this.obtenerDeportes()
    this.obtenerEntrenamientos()
  }

  get f(): { [key: string]: AbstractControl } {
    return this.planForm.controls;
  }

  inicarFormulario() {
    this.planForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      id_deporte: ["", Validators.required],
      entrenamientos: [""],
    })
  }

  obtenerDeportes():void{
    this.deportesService.obtenerDeportes().subscribe(response => {
      this.deportes = response.body;
    },
    error => {
      this.responseError = true
      if (error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }

  obtenerEntrenamientos():void{
    this.entrenamientoService.obtenerEntrenamientos().subscribe(response => {
      
      let respuestaEntrenamientos = new RespuestaEntrenamientos(response.entrenamientos, response.token)
      
      respuestaEntrenamientos.setNuevoToken()
      
      this.entrenamientos = respuestaEntrenamientos.entrenamientos;
    },
    error => {
      this.responseError = true
      if (error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }

  registrarPlan(bodyRequest:any) {
    bodyRequest.entrenamientos=this.all_selected_values
    this.planService.registrarPlan(bodyRequest).subscribe(response => {

      this.exitoso = true
        setTimeout(() => {
          this.router.navigate(['/planes'])
        }, 2000);
    },
    error => {
      this.responseError = true
      if(error.error.description)
        this.responseMessage = error.error.description
      else
        this.responseMessage = "Ocurrió un error al realizar la petición";
    });
  }

  onChange(value: string): void {
    if (this.all_selected_values.includes(value)) {
      this.all_selected_values = this.all_selected_values.filter(
        (item) => item !== value
      );
    } else {
      this.all_selected_values.push(value);
    }
  }


}
