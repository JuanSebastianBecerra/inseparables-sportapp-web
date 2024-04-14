import { createReducer, on } from '@ngrx/store';
import {guardarPerfilDeportivo, resetPerfilDeportivo} from "./perfil-deportista.action";
import {IPerfilState} from "../../../interfaces/IPerfilState";

export const initialState: IPerfilState = {
    perfilDeportista: {
        genero: "",
        edad: "",
        peso: "",
        altura: "",
        paisNacimiento: "",
        ciudadNacimiento: "",
        paisResidencia: "",
        ciudadResidencia: "",
        antiguedad: "",
        tipoSangre: "",
        imc: "",
        horasEjercicio: "",
        pesoObjetivo: "",
        alergias: "",
        deporte: "",
        preferenciaAlimenticia: "",
        planNutricional: "",
        historiaClinica: ""
    }
};

export const perfilDeportivoReducer = createReducer(
    initialState,
    on(guardarPerfilDeportivo, (state, action) => {
        return {
            ...state,
            perfilDeportista: action.perfilDeportista
        };
    }),
    on(resetPerfilDeportivo, () => initialState),
);