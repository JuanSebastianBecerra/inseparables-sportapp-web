
import { Authentication } from "./authentication";
import { DetalleEntrenamiento } from "./entrenamientos";

export class Plan{
    id: string
    nombre: string
    id_deporte: string
    selected: boolean

    constructor(id:string, nombre: string, id_deporte: string){
        this.id = id
        this.nombre = nombre
        this.id_deporte = id_deporte
        this.selected = false
    }
}

export class PlanesRespuesta extends Authentication{
    respuesta: Plan[]

    constructor(respuesta: Plan[], token: string){
        super(token);
        this.respuesta = respuesta
    }

}

export class PlanesEntrenamientoRespuesta extends Authentication{
    respuesta: DetalleEntrenamiento[]

    constructor(respuesta: DetalleEntrenamiento[], token: string){
        super(token);
        this.respuesta = respuesta
    }
}
