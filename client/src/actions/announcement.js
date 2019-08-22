import {GET_ANNOUNCEMENTS} from "./types";
import {setAlert} from "./alert";
import axios from "axios";

export const getAnnouncements = name => async dispatch => {
    try {
        const res = await axios.get(`/api/announcements/${name}`);

        if (res.data.success) {
            dispatch({
                type: GET_ANNOUNCEMENTS,
                payload: res.data.data
            });
        }
    } catch (e) {
    }
};

export const addAnnouncement = (data, name, history) => async dispatch => {
    try {
        let res = await axios.post(`/api/private/announcement/add`, data);
        if (!res.data.success) {
            res.data.errors.map(error =>
                dispatch(setAlert(error.msg, "danger"))
            );
        } else {
            history.push(`/announcements/${name}`);
            dispatch(setAlert(res.data.msg, "success"));
        }
    } catch (e) {
        console.log(e);
    }
};

export const getMainImageAdvertisement = advertisementID => async dispatch => {
    try {
        let res = await axios.get(
            `/api/announcements/image/${advertisementID}`, {
                responseType: "arraybuffer"
            });

        return res;
    } catch {
    }
};
