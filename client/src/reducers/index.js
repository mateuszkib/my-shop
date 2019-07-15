import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import categories from './category';

export default combineReducers({
    alert,
    auth,
    categories,
});