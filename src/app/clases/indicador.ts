import { Authentication } from "./authentication";

export class Indicador{
    fecha: string
    ftp: number
    vo2max: number
    
    constructor(fecha: string, ftp: number, vo2max: number){
        this.fecha = fecha
        this.ftp = ftp
        this.vo2max = vo2max
    }
}

export class IndicadorRespuesta extends Authentication{
    respuesta: Indicador[]

    constructor(respuesta: Indicador[], token: string){
        super(token);
        this.respuesta = respuesta
    }
}