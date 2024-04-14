import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonasService} from "../../../servicios/personas/personas.service";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {guardarPerfilDeportivo} from "../../../store/secciones/usuarios/perfil-deportista.action";
import {Router, RouterModule} from "@angular/router";
import {IPerfilDeportista} from "../../../interfaces/IPerfilDeportista";
import {AdministracionService} from "../../../servicios/administracion/administracion.service";

@Component({
    selector: 'app-perfil-deportista',
    templateUrl: './perfil-deportista.component.html',
    styleUrls: ['./perfil-deportista.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class PerfilDeportistaComponent implements OnInit {

    perfilForm!: FormGroup;
    responseError: boolean = false;
    responseMessage: String = "";
    paises: any;
    ciudadesNacimiento: any;
    ciudadesResidencia: any;

    constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private store: Store<any>,
                private router: Router, private administracionService: AdministracionService) {
    }

    ngOnInit(): void {
        this.iniciarFormularioPerfil();
        this.obtenerPaises();
    }

    iniciarFormularioPerfil() {
        this.perfilForm = this.formBuilder.group({
            genero: ["", Validators.required],
            edad: ["", Validators.required],
            peso: ["", Validators.required],
            altura: ["", Validators.required],
            paisNacimiento: ["", Validators.required],
            ciudadNacimiento: ["", Validators.required],
            paisResidencia: ["", Validators.required],
            ciudadResidencia: ["", Validators.required],
            antiguedad: ["", Validators.required],
            tipoSangre: ["", Validators.required],
            imc: ["", Validators.required],
            horasEjercicio: ["", Validators.required],
            pesoObjetivo: ["", Validators.required],
            alergias: ["", Validators.required],
            deporte: ["", Validators.required],
            preferenciaAlimenticia: ["", Validators.required],
            planNutricional: ["", Validators.required],
            historiaClinica: ["", Validators.required]
        })
    }

    obtenerPaises(){
        this.administracionService.obtenerPaises().subscribe(response => {
                this.paises = response;
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar la petición";
            });
    }

    obtenerCiudadesNacimiento(codigoPais: any){
        this.administracionService.obtenerCiudades(codigoPais).subscribe(response => {
                this.ciudadesNacimiento = response;
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar la petición";
            });
    }

    obtenerCiudadesResidencia(codigoPais: any){
        this.administracionService.obtenerCiudades(codigoPais).subscribe(response => {
                this.ciudadesResidencia = response;
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar la petición";
            });
    }


    guardarPerfil(bodyPerfil: IPerfilDeportista) {
        this.store.dispatch(guardarPerfilDeportivo({perfilDeportista: bodyPerfil}))
        this.router.navigate(['/registro'])
    }

}
