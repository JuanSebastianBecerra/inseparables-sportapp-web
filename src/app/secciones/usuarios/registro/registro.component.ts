import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {PersonasService} from 'src/app/servicios/personas/personas.service';
import { PREFIJO_REGISTRO, PREFIJO_PERFIL_DEPORTIVO } from 'src/app/utils/constants';
import {AdministracionService} from "../../../servicios/administracion/administracion.service";
import { CacheService } from 'src/app/servicios/administracion/cache.service';
import { PerfilDeportista } from 'src/app/clases/perfil-deportista';
import { v4 as uuidv4 } from 'uuid';
import { timer } from 'rxjs';
import { ToastComponent } from 'src/app/comunes/componentes/toast/toast.component';
import { UbicacionMaps } from 'src/app/clases/location';
import { UbicacionComponent } from 'src/app/comunes/componentes/ubicacion/ubicacion.component';
import {TranslateModule} from "@ngx-translate/core";

function passwordMatcher(c: AbstractControl){
    return c.get("password")?.value == c.get("confirm_password")?.value ? null : {'nomatch': true}
}

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastComponent, CommonModule, UbicacionComponent, TranslateModule]
})
export class RegistroComponent implements OnInit {

    registroForm!: FormGroup;
    responseError: boolean = false;
    responseMessage: string = ""
    dataPerfilDeportista!: PerfilDeportista
    idRegistro: string = ""
    mostrarErrorPerfilDeportivo : boolean = false
    mostrarUsuarioRegistrado: boolean = false
    planes!:any;
    selectedPlace! : UbicacionMaps

    constructor(private formBuilder: FormBuilder, private personasService: PersonasService,
        private router: Router, private administracionService: AdministracionService, private cacheService: CacheService
        ) {
            if (this.router.getCurrentNavigation()?.extras.state){
                this.idRegistro = this.router.getCurrentNavigation()?.extras.state!["idRegistro"];
            }else
                this.idRegistro = uuidv4()
    }

    cargarInformacion():void{
       let formulario = this.cacheService.get(PREFIJO_REGISTRO + this.idRegistro)
        if(formulario != undefined){
            this.registroForm.patchValue({
                nombre: formulario.nombre,
                apellido: formulario.apellido,
                username: formulario.username,
                email: formulario.email,
                tipo_identificacion: formulario.tipo_identificacion,
                numero_identificacion: formulario.numero_identificacion,
                password: formulario.password,
                confirm_password: formulario.confirm_password,
                strava_client_id: formulario.strava_client_id,
                strava_client_secret: formulario.strava_client_secret
            });
        }
    }

    ngOnInit(): void {
        localStorage.clear()
        this.iniciarFormulario();
        this.obtenerPlanes();
        this.cargarInformacion()
    }

    get f(): { [key: string]: AbstractControl } {
        return this.registroForm.controls;
    }

    abrirPerfilDeportivo(): void{
        this.mostrarErrorPerfilDeportivo = false
        this.cacheService.put(PREFIJO_REGISTRO + this.idRegistro, this.registroForm.value)
        this.router.navigate(['perfil-deportista'], { state: { idRegistro: this.idRegistro } });
    }

    iniciarFormulario() {
        this.registroForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            nombre: ["", Validators.required],
            apellido: ["", Validators.required],
            tipo_identificacion: ["", Validators.required],
            numero_identificacion: ["", Validators.required],
            username: ["", Validators.required],
            password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
            confirm_password: ["", Validators.compose([Validators.required, Validators.minLength(6)])],
            suscripcion: ["", Validators.required],
            strava_client_id: [""],
            strava_client_secret: [""]
        }, {validator: passwordMatcher})
    }

    registrarUsuario(bodyRequest: any) {
        let perfilDeportivo : PerfilDeportista = this.cacheService.get(PREFIJO_PERFIL_DEPORTIVO + this.idRegistro)
        if (perfilDeportivo == undefined){
            this.mostrarErrorPerfilDeportivo = true
        }
        else{
            bodyRequest.direccion = this.selectedPlace
            this.personasService.registrarUsuario(bodyRequest).subscribe(response => {
                let respuesta = response?.body;
                let idUsuarioRegistrado = respuesta.id
                perfilDeportivo.id_usuario = idUsuarioRegistrado
                this.personasService.registrarPerfilDeportivo(perfilDeportivo).subscribe(response => {
                    this.mostrarUsuarioRegistrado = true
                    this.registroForm.reset()
                    this.cacheService.clear(PREFIJO_PERFIL_DEPORTIVO + this.idRegistro)
                    this.cacheService.clear(PREFIJO_REGISTRO + this.idRegistro)
                    this.idRegistro = uuidv4()
                    timer(5000).subscribe(x => { 
                        this.router.navigate(['/'])
                        this.mostrarUsuarioRegistrado = false
                    })
                    
                }, error => {
                    this.responseError = true
                    if (error.error.description)
                        this.responseMessage = error.error.description
                    else
                        this.responseMessage = "Ocurrió un error al guardar el perfil deportivo";
                })
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al guardar el usuario";
            })
        }
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

    onSeleccionarDireccion(direccion: UbicacionMaps){
        this.selectedPlace = direccion
    }
}

