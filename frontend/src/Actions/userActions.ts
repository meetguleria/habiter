import { SET_USER, LOGOUT_USER } from "./actionTypes";
import { UserType } from "../Types/userTypes";

export const setUser = (user: UserType) => ({
    type: SET_USER,
    payload: user,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});