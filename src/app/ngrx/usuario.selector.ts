import { createSelector } from "@ngrx/store";

export interface UserState {
    userInfo: {
        email: string;
        password: string;
        [key: string]: any;
    }[];
}

const selectUsuario = createSelector(
    (state: UserState) => state.userInfo,
    (usuario) => usuario
);

export { selectUsuario };