import { GET_CATEGORIES, ERROR_ADD_CATEGORIES } from "../actions/types";

const initialState = {
    category: null,
    categories: [],
    errors: []
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        case ERROR_ADD_CATEGORIES:
            return {
                errors: payload
            };
        default:
            return {
                ...state
            };
    }
}
