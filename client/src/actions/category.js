import {GET_CATEGORIES} from "./types";
import axios from 'axios';

export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/categories');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
        return res.data;
    } catch (e) {

    }
};

export const getImageCategory = (categoryID) => async dispatch => {
    try {
        const res = await axios.get(`/api/categories/image/${categoryID}`, {responseType: 'arraybuffer'});
        return res.data;
    } catch (e) {
        console.log(e);
    }
};