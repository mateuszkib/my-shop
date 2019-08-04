import {ADD_ANNOUNCEMENT} from "./types";
import {setAlert} from "./alert";
import axios from "axios";

export const getAnnouncements = name => async dispatch => {
    try {
        const res = await axios.get(`/api/announcement/${name}`);
    } catch (e) {
    }
};

export const addAnnouncement = data => async dispatch => {
    try {
        let res = await axios.post(`/api/private/announcement/add`, data);

        if (!res.data.success) {
            res.data.errors.map(error =>
                dispatch(setAlert(error.msg, "danger", 1000000))
            );
        } else {
            dispatch(setAlert(res.data.msg, 'success'));
        }

    } catch (e) {
        console.log(e);
    }
};
