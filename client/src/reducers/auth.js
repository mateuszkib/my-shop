import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER,
    ERROR_LOAD_USER,
    LOGOUT_USER
} from "../actions/types";

const initialState = {
    isAuthenticated: null,
    user: null,
    isRegister: null,
    token: null
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
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case LOGIN_FAIL:
        case ERROR_LOAD_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false
            };
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: payload
            };
        default:
            return {...state}
    }
}