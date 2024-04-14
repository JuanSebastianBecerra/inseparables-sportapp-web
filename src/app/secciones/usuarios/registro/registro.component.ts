import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {PersonasService} from 'src/app/servicios/personas/personas.service';
import {SATUS_CODE_CREATED} from 'src/app/utils/constants';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

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

    perfilDeportivo: Object = {};
    perfilSubscribe!: Subscription;

    constructor(private formBuilder: FormBuilder, private personasService: PersonasService, private router: Router, private store: Store<{ perfilDeportivo: Object }>) {

    }

    ngOnInit(): void {
        this.inicarFormulario()
        this.perfilDeportivo = this.store.select('perfilDeportivo')
            .subscribe(data => {
                console.log(data)
            })
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

    registrarUsuario(bodyRequest: any) {
        this.personasService.registrarUsuario(bodyRequest).subscribe(response => {
                response.status === SATUS_CODE_CREATED && this.router.navigate(['/home'])
            },
            error => {
                this.responseError = true
                if (error.error.description)
                    this.responseMessage = error.error.description
                else
                    this.responseMessage = "Ocurrió un error al realizar la petición";
            });
    }

    ngOnDestroy(): void {
        if(this.perfilSubscribe){
            this.perfilSubscribe.unsubscribe();
        }
    }


}
