import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {PersonasService} from 'src/app/servicios/personas/personas.service';
import {SATUS_CODE_CREATED} from 'src/app/utils/constants';
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {selectPerfilDeportista} from "../../../store/secciones/usuarios/perfil-deportista.selectors";
import {IPerfilDeportista} from "../../../interfaces/IPerfilDeportista";
import {AppState} from "../../../store/app.state";
import {AdministracionService} from "../../../servicios/administracion/administracion.service";

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class RegistroComponent implements OnInit {

    registroForm!: FormGroup;
    responseError: boolean = false;
    responseMessage: String = ""

    perfilDeportista$!: Observable<IPerfilDeportista>;
    planes!:any;

    constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private router: Router,
                private store: Store<AppState>, private administracionService: AdministracionService) {

    }

    ngOnInit(): void {
        this.inicarFormulario();
        this.obtenerPlanes();
        this.perfilDeportista$ = this.store.select(selectPerfilDeportista)

    }

    get f(): { [key: string]: AbstractControl } {
        return this.registroForm.controls;
    }


    inicarFormulario() {
        this.registroForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            nombre: ["", Validators.required],
            apellido: ["", Validators.required],
            tipo_identificacion: ["", Validators.required],
            numero_identificacion: ["", Validators.required],
            username: ["", Validators.required],
            password: ["", Validators.required],
            suscripcion: ["", Validators.required],
        })
    }

    savePerfilDeportivoBody(idUsuario: string) {
        let bodyRequest = {};
        alert(idUsuario)
        this.perfilDeportista$.subscribe(response => {
            bodyRequest = {
                "id_usuario": idUsuario,
                "genero": response.genero,
                "edad": response.edad,
                "peso": response.peso,
                "altura": response.altura,
                "pais_nacimiento": response.paisNacimiento,
                "ciudad_nacimiento": response.ciudadNacimiento,
                "pais_residencia": response.paisResidencia,
                "ciudad_residencia": response.ciudadResidencia,
                "antiguedad_residencia": response.antiguedad,
                "imc": response.imc,
                "horas_semanal": response.horasEjercicio,
                "peso_objetivo": response.pesoObjetivo,
                "alergias": response.alergias,
                "preferencia_alimenticia": response.preferenciaAlimenticia,
                "plan_nutricional": response.planNutricional,
                "url_historia_clinica": response.historiaClinica,
                "vo2max": 0,
                "ftp": 0
            }
            this.personasService.registrarPerfilDeportivo(bodyRequest).subscribe(response => {
                response.status === SATUS_CODE_CREATED && this.router.navigate(['/'])
            })
        })
    }

    registrarUsuario(bodyRequest: any) {
        this.personasService.registrarUsuario(bodyRequest).subscribe(response => {
                const res = response?.body;
                res?.id && this.savePerfilDeportivoBody(res?.id)
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar la petición";
            });
    }

    obtenerPlanes():void{
        this.administracionService.obtenerPlanes().subscribe(response => {
                this.planes = response.body;
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar la petición";
            });
    }


}
