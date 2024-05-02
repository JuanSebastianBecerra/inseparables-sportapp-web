export class UbicacionMaps{
    id: string
    direccion: string
    ubicacionLatitud: string
    ubicacionLongitus: string
    nombre: string

    constructor(id: string, direccion: string, ubicacionLatitud: string, ubicacionLongitus: string, nombre: string){
        this.id = id
        this.direccion = direccion
        this.ubicacionLatitud = ubicacionLatitud
        this.ubicacionLongitus = ubicacionLongitus
        this.nombre = nombre
    }

}