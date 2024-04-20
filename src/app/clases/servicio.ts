export class Servicio{
    descripcion: string;
    detalle: string;
    id: string;
    id_deporte: string;
    id_socio: string;
    nombre_socio: string
    nombre: string;
    valor: number

    constructor(descripcion: string, detalle: string, id: string, 
        id_deporte: string, id_socio: string, nombre_socio: string, 
        nombre: string, valor: number){
        this.descripcion = descripcion;
        this.detalle = detalle;
        this.id = id;
        this.id_deporte = id_deporte
        this.id_socio = id_socio;
        this.nombre_socio = nombre_socio
        this.nombre = nombre;
        this.valor = valor
    }
}