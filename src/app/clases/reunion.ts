
import { Authentication } from "./authentication";


export class RespuestaReunion extends Authentication{
  respuesta: Reunion

  constructor(respuesta: Reunion, token: string){
    super(token);
    this.respuesta = respuesta
  }
}


export class RespuestaReuniones extends Authentication{
  respuesta: Reunion[]
  
  constructor(respuesta: Reunion[], token: string){
    super(token);
    this.respuesta = respuesta
  }

}

export class Reunion{
    id: string;
    fecha: string;
    lugar: string;
    id_entrenador: string;
    id_usuario: string;
    nombre_entrenador: string;
    detalle_entrenador: string;

    constructor(id: string, fecha: string, lugar: string,
      id_entrenador: string,id_usuario: string, nombre_entrenador: string, detalle_entrenador: string){
        this.id = id
        this.fecha = fecha;
        this.lugar = lugar; 
        this.id_entrenador = id_entrenador;
        this.id_usuario = id_usuario;
        this.nombre_entrenador = nombre_entrenador;
        this.detalle_entrenador = detalle_entrenador;
  }
}
