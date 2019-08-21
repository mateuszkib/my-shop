import {GET_ANNOUNCEMENTS, ADD_ANNOUNCEMENT} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_ANNOUNCEMENTS:
            return {
                payload
            };
        case ADD_ANNOUNCEMENT:
            return {
                payload
            };
        default:
            return {
                ...state
            };
    }
}
