export class PerfilDeportista{
    id_usuario: string
    genero: string
    edad: string
    peso: string
    altura: string
    pais_nacimiento: string
    ciudad_nacimiento: string
    pais_residencia: string
    ciudad_residencia: string
    antiguedad_residencia: string
    tipo_sangre: string
    imc: string
    horas_semanal: string
    peso_objetivo: string
    alergias: string
    deporte: string
    preferencia_alimenticia: string
    plan_nutricional: string
    url_historia_clinica: string
    direccion: string

    constructor(id_usuario: string, genero: string, edad: string, peso: string, altura: string, pais_nacimiento: string, ciudad_nacimiento: string,
        pais_residencia: string, ciudad_residencia: string, antiguedad_residencia: string, tipo_sangre: string, imc: string, horas_semanal: string, 
        peso_objetivo: string, alergias: string, deporte: string, preferencia_alimenticia: string, plan_nutricional: string,
        url_historia_clinica: string, direccion: string){
        this.id_usuario = id_usuario;
        this.genero = genero;
        this.edad = edad;
        this.peso = peso;
        this.altura = altura;
        this.pais_nacimiento = pais_nacimiento;
        this.ciudad_nacimiento = ciudad_nacimiento;
        this.pais_residencia = pais_residencia;
        this.ciudad_residencia = ciudad_residencia;
        this.antiguedad_residencia = antiguedad_residencia;
        this.tipo_sangre = tipo_sangre;
        this.imc = imc;
        this.horas_semanal = horas_semanal;
        this.peso_objetivo = peso_objetivo;
        this.alergias = alergias;
        this.deporte = deporte;
        this.preferencia_alimenticia = preferencia_alimenticia;
        this.plan_nutricional = plan_nutricional;
        this.url_historia_clinica = url_historia_clinica;
        this.direccion = direccion
    }
}
