import { MODIFY_EMAIL_NEW_CONTACT, ADD_CONTACT_FAILED, 
        ADD_CONTACT_SUCCESS, WAITING } from '../actions/types';

const INITIAL_STATE = {
    emailNewContact: '',
    errorAddContact: '',
    loading: false,
    registerIncluded: false
};

export default (state = INITIAL_STATE, action) => {
    let lRet = {};
    console.log(action);
    switch (action.type) {
        case MODIFY_EMAIL_NEW_CONTACT:
            lRet = { ...state, emailNewContact: action.payload };
            break;
        case ADD_CONTACT_FAILED:
            lRet = { ...state, errorAddContact: action.payload, loading: false };
            break;
        case ADD_CONTACT_SUCCESS:
            lRet = { ...state, errorAddContact: '', emailNewContact: '', loading: false, registerIncluded: action.payload };
            break;
        case WAITING:
            lRet = { ...state, loading: true };
            break;
        default:
            lRet = state;
            break;
    }
    return lRet;
};
