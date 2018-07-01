import { LIST_USER_CHATS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    let lRet = {};

    switch (action.type) {
        case LIST_USER_CHATS: 
            lRet = action.payload;
            break;
        default:
            lRet = { ...state };
            break;
    }

    return lRet;
};
