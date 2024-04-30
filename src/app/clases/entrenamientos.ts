import { Authentication } from "./authentication";

export class RespuestaEntrenamientos extends Authentication{
    entrenamientos: DetalleEntrenamiento[]

    constructor(entrenamientos: DetalleEntrenamiento[], token: string){
        super(token)
        this.entrenamientos = entrenamientos
    }
}

export class DetalleEntrenamiento{
    id: string;
    nombre: string;
    hora_inicio: string;
    hora_fin: string;
    lugar: string;
    frecuencia: string;
    detalle: string;
    deporte: string;

    constructor(id: string, nombre: string, hora_inicio: string, hora_fin: string,
        lugar: string, frecuencia: string, detalle: string, deporte: string){
        this.id = id;
        this.nombre = nombre;
        this.hora_inicio = hora_inicio;
        this.hora_fin = hora_fin;
        this.lugar = lugar;
        this.frecuencia = frecuencia;
        this.detalle = detalle;
        this.deporte = deporte;

    }
}