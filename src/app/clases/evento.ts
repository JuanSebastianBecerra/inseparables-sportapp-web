export class Evento{
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    detalle: string;
    id_socio: string;
    id_deporte: string;

    constructor(id: string, nombre: string, fecha_inicio: string, fecha_fin: string, 
        detalle: string, id_socio: string, id_deporte: string){
        this.id = id;
        this.nombre = nombre;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin
        this.detalle = detalle;
        this.id_socio = id_socio
        this.id_deporte = id_deporte;
    }
}