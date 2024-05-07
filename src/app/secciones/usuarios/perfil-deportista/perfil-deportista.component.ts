import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PersonasService} from "../../../servicios/personas/personas.service";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import { PREFIJO_PERFIL_DEPORTIVO } from 'src/app/utils/constants';
import {PerfilDeportista} from "../../../clases/perfil-deportista";
import {AdministracionService} from "../../../servicios/administracion/administracion.service";
import { CacheService } from 'src/app/servicios/administracion/cache.service';
import { Observable } from 'rxjs';
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-perfil-deportista',
    templateUrl: './perfil-deportista.component.html',
    styleUrls: ['./perfil-deportista.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule, TranslateModule]
})
export class PerfilDeportistaComponent implements OnInit {

    state!: Observable<object>;

    perfilForm!: FormGroup;
    responseError: boolean = false;
    responseMessage: string = "";
    paises: any;
    ciudadesNacimiento: any;
    ciudadesResidencia: any;
    idRegistro!: string

    constructor(private formBuilder: FormBuilder, private personasService: PersonasService,
                private router: Router, private administracionService: AdministracionService, private cacheService: CacheService,
                public activatedRoute: ActivatedRoute) {
        if (this.router.getCurrentNavigation()?.extras.state)
                this.idRegistro = this.router.getCurrentNavigation()?.extras.state!["idRegistro"];
        else
            this.router.navigate(['/registro'])
    }

    ngOnInit(): void {
        localStorage.clear()
        this.iniciarFormularioPerfil();
        this.obtenerPaises();
        this.cargarInformacion()
    }

    cargarInformacion():void{
        let oldPerfilDeportivo = this.cacheService.get(PREFIJO_PERFIL_DEPORTIVO + this.idRegistro);
        if(oldPerfilDeportivo != undefined){
            this.perfilForm.patchValue({
                genero: oldPerfilDeportivo.genero,
                edad: oldPerfilDeportivo.edad,
                peso: oldPerfilDeportivo.peso,
                altura: oldPerfilDeportivo.altura,
                pais_nacimiento: oldPerfilDeportivo.pais_nacimiento,
                ciudad_nacimiento: oldPerfilDeportivo.ciudad_nacimiento,
                pais_residencia: oldPerfilDeportivo.pais_residencia,
                ciudad_residencia: oldPerfilDeportivo.ciudad_residencia,
                antiguedad_residencia: oldPerfilDeportivo.antiguedad_residencia,
                tipo_sangre: oldPerfilDeportivo.tipo_sangre,
                imc: oldPerfilDeportivo.imc,
                horas_semanal: oldPerfilDeportivo.horas_semanal,
                peso_objetivo: oldPerfilDeportivo.peso_objetivo,
                alergias: oldPerfilDeportivo.alergias,
                deporte: oldPerfilDeportivo.deporte,
                preferencia_alimenticia: oldPerfilDeportivo.preferencia_alimenticia,
                plan_nutricional: oldPerfilDeportivo.plan_nutricional,
                url_historia_clinica: oldPerfilDeportivo.url_historia_clinica,
            });
            
        }
         
     }

    iniciarFormularioPerfil() {
        this.perfilForm = this.formBuilder.group({
            genero: ["", Validators.required],
            edad: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(99)])],
            peso: ["", Validators.compose([Validators.required, Validators.min(20), Validators.max(180)])],
            altura: ["", Validators.compose([Validators.required, Validators.min(50), Validators.max(250)])],
            pais_nacimiento: ["", Validators.required],
            ciudad_nacimiento: ["", Validators.required],
            pais_residencia: ["", Validators.required],
            ciudad_residencia: ["", Validators.required],
            antiguedad_residencia: ["", Validators.compose([Validators.required, Validators.min(1), Validators.max(99)])],
            tipo_sangre: ["", Validators.required],
            imc: ["", Validators.compose([Validators.required, Validators.min(10), Validators.max(100)])],
            horas_semanal: ["", Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])],
            peso_objetivo: ["", Validators.compose([Validators.required, Validators.min(20), Validators.max(180)])],
            alergias: ["", Validators.required],
            deporte: ["", Validators.required],
            preferencia_alimenticia: ["", Validators.required],
            plan_nutricional: ["", Validators.required],
            url_historia_clinica: ["", Validators.required],
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


    guardarPerfil(bodyPerfil: PerfilDeportista) {
        this.cacheService.put(PREFIJO_PERFIL_DEPORTIVO + this.idRegistro, bodyPerfil)
        this.router.navigate(['registro'], { state: { idRegistro: this.idRegistro } });
    }

    cancelarPerfil(){
        this.router.navigate(['registro'], { state: { idRegistro: this.idRegistro } });
    }

}
