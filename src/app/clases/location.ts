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


export class DireccionDeportista{
    id: string
    direccion: string
    ubicacion_latitud: string
    ubicacion_longitud: string
    nombre: string

    constructor(id: string, direccion: string, ubicacion_latitud: string, ubicacion_longitud: string, nombre: string){
        this.id = id
        this.direccion = direccion
        this.ubicacion_latitud = ubicacion_latitud
        this.ubicacion_longitud = ubicacion_longitud
        this.nombre = nombre
    }

}