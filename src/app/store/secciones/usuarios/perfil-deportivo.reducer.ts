import { createReducer, on } from '@ngrx/store';
import {guardarPerfilDeportivo, resetPerfilDeportivo} from "./perfil-deportista.action";

export const initialState = {
    perfilDeportivo: {}
};

export const perfilDeportivoReducer = createReducer(
    initialState,
    on(guardarPerfilDeportivo, (state, action) => {
        state = {
            ...state,
            perfilDeportivo: action.perfilDeportivo
        }

        return state;
    }),
    on(resetPerfilDeportivo, () => initialState),
);