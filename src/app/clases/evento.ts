import { Authentication } from "./authentication";
import { UbicacionMaps } from "./location";

export class Evento{
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    detalle: string;
    id_socio: string;
    id_deporte: string;
    inscrito: boolean;
    ubicacion: UbicacionMaps

    constructor(id: string, nombre: string, fecha_inicio: string, fecha_fin: string, 
        detalle: string, id_socio: string, id_deporte: string, ubicacion: UbicacionMaps){
        this.id = id;
        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin
        this.detalle = detalle;
        this.id_socio = id_socio
        this.id_deporte = id_deporte;
        this.inscrito = false;
        this.ubicacion = ubicacion
    }
}

export class RespuestaEventos extends Authentication{
    respuesta: Evento[]

    constructor(respuesta: Evento[], token: string){
        super(token);
        this.respuesta = respuesta
    }

}

export class RespuestaEvento extends Authentication{
    respuesta: Evento

    constructor(respuesta: Evento, token: string){
        super(token);
        this.respuesta = respuesta
    }

}
