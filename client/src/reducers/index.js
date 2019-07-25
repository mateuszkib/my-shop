import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import categories from "./category";
import advertisement from "./announcement";

export default combineReducers({
    alert,
    auth,
    categories,
    advertisement
});
