import { createAction, createReducer, on, props } from "@ngrx/store";
import { addUserInfos, addLoginCredentials } from "./usuario.actions";


const fnAddLoginCredentials = (state: any, userInfo: any ) => {
    return [ {email: userInfo.email, password: userInfo.password }, ...state];
}

const fnAddUserInfos = (state: any, infos: any) => {
    if(!Array.isArray(state) || state.length === 0) {
        return state;
    }

    const stateCopy = [...state];
    stateCopy[0] = { ...stateCopy[0], ...infos }
    return stateCopy;
};

const initialState: any[] = [];
export const userReducer = createReducer(
    initialState,
    on(addLoginCredentials, fnAddLoginCredentials),
    on(addUserInfos, fnAddUserInfos)
)