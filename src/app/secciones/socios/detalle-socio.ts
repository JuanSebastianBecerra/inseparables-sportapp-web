
export class DetalleSocio{
    nombre: string;
    apellido: string;
    detalle: string;
    id: number;
    email: string;
    tipo_identificacion: string;
    numero_identificacion: string;
    username : string;
    password : string;
 

    constructor(id: number, nombre: string, apellido: string,
                detalle: string,email: string,tipo_identificacion: string,
                numero_identificacion: string,
                username : string, password : string){
        this.id = id
        this.nombre = nombre;
        this.apellido = apellido; 
        this.email = email;
        this.tipo_identificacion = tipo_identificacion;
        this.numero_identificacion = numero_identificacion;
        this.username = username;
        this.password = password;
        this.detalle = detalle;
  }
}
