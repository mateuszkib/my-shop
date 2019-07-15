import {GET_CATEGORIES} from "./types";
import axios from 'axios';

export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/categories');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })
    } catch (e) {

    }
};