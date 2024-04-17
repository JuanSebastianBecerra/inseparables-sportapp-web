import { PerfilDeportista } from "./perfil-deportista"

export class Registro {
    nombres: string
    apellidos: string
    usuario: string
    email: string
    tipoIdentificacion: string
    numeroIdentificacion: string
    contrasena: string
    confirmacionContrasena: string
    planSuscripcion: string
    perfilDeportivo: PerfilDeportista

    constructor(nombres: string, apellidos: string, usuario: string, email: string, tipoIdentificacion: string, 
        numeroIdentificacion: string, contrasena: string, confirmacionContrasena: string, planSuscripcion: string, 
        perfilDeportivo: PerfilDeportista){
            this.nombres = nombres;
            this.apellidos = apellidos;
            this.usuario = usuario;
            this.email = email;
            this.tipoIdentificacion = tipoIdentificacion;
            this.numeroIdentificacion = numeroIdentificacion;
            this.contrasena = contrasena;
            this.confirmacionContrasena = confirmacionContrasena;
            this.planSuscripcion = planSuscripcion;
            this.perfilDeportivo = perfilDeportivo;
        }
}