import { Authentication } from "./authentication";
import { Servicio } from "./servicio";

export class RespuestaServiciosRecomendados extends Authentication{
    respuesta: Servicio[]

    constructor(respuesta: Servicio[], token: string){
        super(token);
        this.respuesta = respuesta
    }

}
