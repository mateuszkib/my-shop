import {REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGIN_FAIL} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

export const register = (body) => async dispatch => {
    try {
        const res = await axios.post('/api/auth/register', body);

        if (!res.data.success) {
            res.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        } else {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
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
        console.log(res.data);
        if (!res.data.success) {
            res.data.errors.map(error => dispatch(setAlert(error.msg, 'danger')));
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
                isAuthenticated: true
            })
        }
    } catch (e) {

    }
};