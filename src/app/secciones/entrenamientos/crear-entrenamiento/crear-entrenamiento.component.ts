import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToastComponent} from "../../../comunes/componentes/toast/toast.component";
import {EntrenamientosService} from "../../../servicios/entrenamientos/entrenamientos.service";
import {Router, RouterModule} from "@angular/router";
import {timer} from "rxjs";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";

@Component({
    selector: 'app-crear-entrenamiento',
    templateUrl: './crear-entrenamiento.component.html',
    styleUrls: ['./crear-entrenamiento.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, ToastComponent,
        RouterModule, NgxMaterialTimepickerModule]
})
export class CrearEntrenamientoComponent implements OnInit {

    entrenamientoForm!: FormGroup;
    fechaInicio: any = new Date();
    fechaFin: any = new Date();

    responseError: boolean = false;
    responseMessage: String = ""
    exitoso = false

    frecuenciaOpciones: Array<any> = [
        {
            nombre: "radioDiario",
            texto: "Diario",
            llave: "DIARIO",
            seleccionado: true
        },
        {
            nombre: "radioSemanal",
            texto: "Lunes a Viernes",
            llave: "SEMANAL",
            seleccionado: false
        },
        {
            nombre: "radioFines",
            texto: "Fines de semana",
            llave: "FINES_SEMANA",
            seleccionado: false
        }
    ]

    constructor(private formBuilder: FormBuilder, private entrenamientoService: EntrenamientosService, private router: Router) {
    }

    get f(): { [key: string]: AbstractControl } {
        return this.entrenamientoForm.controls;
    }

    ngOnInit(): void {
        this.iniciarFormulario()
    }

    iniciarFormulario() {
        this.entrenamientoForm = this.formBuilder.group({
            nombre: ["", Validators.required],
            hora_inicio: ["", Validators.required],
            hora_fin: ["", Validators.required],
            lugar: ["", Validators.required],
            frecuencia: ["", Validators.required],
            detalle: ["", Validators.required],
            deporte: ["", Validators.required]
        })
    }

    guardarEntrenamiento(bodyRequest: any) {
        this.entrenamientoService.guardarEntrenamiento(bodyRequest).subscribe(response => {
                this.exitoso = true
                this.entrenamientoForm.reset();
                timer(2000).subscribe(x => {
                    this.router.navigate(["/entrenamientos"])
                })
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar el registro del entrenamiento";
            });
    }


}
