import { SET_USER, LOGOUT_USER } from "../Actions/actionTypes";
import { UserStateType, UserActionType } from '../Types/userTypes';

const initialState: UserStateType = {
    user: null,
};

const userReducer = (state = initialState, action: UserActionType): UserStateType => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case LOGOUT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default userReducer;
