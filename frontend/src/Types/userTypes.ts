import { SET_USER, LOGOUT_USER } from "../Actions/actionTypes";

export interface UserType {
    id: number;
    name: string;
    email: string;
}

export interface UserStateType {
    user: UserType | null;
}

export interface SetUserAction {
    type: typeof SET_USER;
    payload: UserType;
}

export interface LogoutUserAction {
    type: typeof LOGOUT_USER;
}

export type UserActionType = SetUserAction | LogoutUserAction;