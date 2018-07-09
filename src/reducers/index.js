import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';
import ListContactsReducer from './ListContactsReducer';
import ListChatsReducer from './ListChatsReducer';
import ListOldChatsReducer from './ListOldChatsReducer';

export default combineReducers({
    Auth: AuthReducer,
    ReducerApp: AppReducer,
    ListReducer: ListContactsReducer,
    ChatsReducer: ListChatsReducer,
    OldChatsReducer: ListOldChatsReducer,
});
