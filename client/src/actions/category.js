import { GET_CATEGORIES, ERROR_ADD_CATEGORIES } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

// Public methods
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get("/api/categories");
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
        return res.data;
    } catch (e) {}
};

export const getImageCategory = categoryID => async dispatch => {
    try {
        const res = await axios.get(`/api/categories/image/${categoryID}`, {
            responseType: "arraybuffer"
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// Private methods

export const addCategory = body => async dispatch => {
    const res = await axios.post("/api/private/categories/add", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    if (!res.data.success) {
        res.data.errors.map(error => dispatch(setAlert(error.msg, "danger")));
        dispatch({
            type: ERROR_ADD_CATEGORIES,
            payload: res.data.errors
        });
    }

    dispatch(setAlert(res.data.msg, "success"));
};
