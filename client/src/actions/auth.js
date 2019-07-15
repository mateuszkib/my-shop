import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER,
    ERROR_LOAD_USER,
    LOGOUT_USER
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";
import {setAuthToken} from "../utils/setAuthToken";

export const register = (body) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/register', body);

        if (!res.data.success) {
            res.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        } else {
            dispatch({
                type: REGISTER_SUCCESS,
            });
            dispatch(setAlert(res.data.msg, 'success', 10000));
        }
    } catch (e) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
};

export const login = body => async dispatch => {
    try {
        const res = await axios.post('/api/auth/login', body);
        const {token} = res.data;

        if (!res.data.success) {
            res.data.errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: token,
                isAuthenticated: true
            });
            dispatch(loadUser());
        }
    } catch (e) {
        dispatch({
            type: LOGIN_FAIL,
            isAuthenticated: false
        })
    }
};

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/private/user');
        if (!res.data.success) {
            dispatch({
                type: ERROR_LOAD_USER,
                payload: {}
            })
        } else {
            dispatch({
                type: LOAD_USER,
                payload: res.data.user
            })
        }

    } catch (e) {
        dispatch({
            type: ERROR_LOAD_USER,
            payload: {}
        })
    }
};

export const logout = () => async dispatch => {
    setAuthToken(null);
    dispatch({
        type: LOGOUT_USER,
        payload: null
    })
};