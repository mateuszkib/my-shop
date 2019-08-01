import { ADD_ANNOUNCEMENT } from "./types";
import axios from "axios";

export const getAnnouncements = name => async dispatch => {
    try {
        const res = await axios.get(`/api/announcement/${name}`);
    } catch (e) {}
};

export const addAnnouncement = data => async dispatch => {
    try {
        let res = await axios.post(`/api/private/announcement/add`, data);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
};
