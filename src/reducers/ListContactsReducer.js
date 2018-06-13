import { LIST_USER_CONTACTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    let lRet = {};

    switch (action.type) {
        case LIST_USER_CONTACTS: 
            lRet = action.payload;
            break;
        default:
            lRet = { ...state };
            break;
    }

    return lRet;
};
