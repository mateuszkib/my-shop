import { GET_ADVERTISEMENTS } from "./types";
import axios from "axios";

export const getAdvertisements = name => async dispatch => {
    try {
        const res = await axios.get(`/api/announcement/${name}`);
        console.log(res);
    } catch (e) {}
};
