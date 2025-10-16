import { createAction, props } from "@ngrx/store";

export const addLoginCredentials = createAction(
    '[Usuario] Add Login Credentials',
    props<{ email: string; password: string }>()
);

export const addUserInfos = createAction(
    '[Usuario] Add User Infos', props<{ nome: string; telefone: string; idade: number; observacao: string; }>()
);