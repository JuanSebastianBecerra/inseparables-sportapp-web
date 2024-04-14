import {createAction, props} from '@ngrx/store';

export const guardarPerfilDeportivo = createAction('[Perfil Component] Guardar perfil deportivo', props<{ perfilDeportivo: Object }>());
export const resetPerfilDeportivo = createAction('[Perfil Component] Reset perfil deportivo');