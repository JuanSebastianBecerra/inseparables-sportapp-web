import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonasService} from "../../../servicios/personas/personas.service";
import {CommonModule} from "@angular/common";
import {Store} from "@ngrx/store";
import {guardarPerfilDeportivo} from "../../../store/secciones/usuarios/perfil-deportista.action";
import {Router, RouterModule} from "@angular/router";
import {IPerfilDeportista} from "../../../interfaces/IPerfilDeportista";

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
    responseMessage: String = ""

    constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private store: Store<any>, private router: Router) {
    }

    ngOnInit(): void {
        this.iniciarFormularioPerfil()
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


    guardarPerfil(bodyPerfil: IPerfilDeportista) {
        this.store.dispatch(guardarPerfilDeportivo({perfilDeportista: bodyPerfil}))
        this.router.navigate(['/registro'])
    }

}
