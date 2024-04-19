import { Authentication } from "./authentication";


export class RespuestaServicio extends Authentication{
    respuesta: DetalleServicio

    constructor(respuesta: DetalleServicio, token: string){
        super(token)
        this.respuesta = respuesta
    }
}

export class RespuestaServicios extends Authentication{
    respuesta: DetalleServicio[]

    constructor(respuesta: DetalleServicio[], token: string){
        super(token)
        this.respuesta = respuesta
    }
}

export class DetalleServicio{
    id: string;
    descripcion: string;
    detalle: string;
    id_deporte: string;
    id_socio: string;
    nombre: string;
    valor: number;

    constructor(id: string, descripcion: string, detalle: string, 
        id_deporte: string, id_socio: string, nombre: string, valor: number){
            this.id = id;
            this.descripcion = descripcion;
            this.detalle = detalle;
            this.id_deporte = id_deporte;
            this.id_socio = id_socio;
            this.nombre = nombre;
            this.valor = valor;
        }
}