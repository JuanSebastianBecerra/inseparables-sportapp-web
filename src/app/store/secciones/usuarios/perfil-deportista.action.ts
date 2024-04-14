import {createAction, props} from '@ngrx/store';
import {IPerfilDeportista} from "../../../interfaces/IPerfilDeportista";

export const SAVE_PERFIL_DEPORTISTA_TYPE = '[Perfil Component] Guardar perfil deportivo';

export const guardarPerfilDeportivo = createAction(SAVE_PERFIL_DEPORTISTA_TYPE, props<{ perfilDeportista: IPerfilDeportista }>());
export const resetPerfilDeportivo = createAction('[Perfil Component] Reset perfil deportivo');