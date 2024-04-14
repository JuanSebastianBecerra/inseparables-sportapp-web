import {createSelector} from "@ngrx/store";
import {AppState} from "../../app.state";
import {IPerfilState} from "../../../interfaces/IPerfilState";

export const selectPerfilDeportistaFeature = (state: AppState) => state.perfil;

export const selectPerfilDeportista = createSelector(
    selectPerfilDeportistaFeature,
    (state:IPerfilState ) => state.perfilDeportista
);