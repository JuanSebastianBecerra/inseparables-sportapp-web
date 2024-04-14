import {IPerfilState} from "../interfaces/IPerfilState";
import {perfilDeportivoReducer} from "./secciones/usuarios/perfil-deportivo.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState{
    perfil: IPerfilState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    perfil: perfilDeportivoReducer
};