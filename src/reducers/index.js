import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import ListContactsReducer from './ListContactsReducer';

export default combineReducers({
    Auth: AuthReducer,
    ReducerApp: AppReducer,
    ListReducer: ListContactsReducer
});
