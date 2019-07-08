import {LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    user: null,
    isRegister: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isRegister: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                payload,
                isAuthenticated: true
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return {...state}
    }
}