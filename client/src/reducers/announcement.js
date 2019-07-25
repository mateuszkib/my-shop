import { GET_ADVERTISEMENTS } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ADVERTISEMENTS:
            return {
                payload
            };
        default:
            return {
                ...state
            };
    }
}
