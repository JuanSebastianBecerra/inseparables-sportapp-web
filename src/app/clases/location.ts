export class UbicacionMaps{
    id: string
    direccion: string
    ubicacionLatitud: string
    ubicacionLongitud: string
    nombre: string

    constructor(id: string, direccion: string, ubicacionLatitud: string, ubicacionLongitud: string, nombre: string){
        this.id = id
        this.direccion = direccion
        this.ubicacionLatitud = ubicacionLatitud
        this.ubicacionLongitud = ubicacionLongitud
        this.nombre = nombre
    }

}