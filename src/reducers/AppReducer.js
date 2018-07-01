import { MODIFY_EMAIL_NEW_CONTACT, ADD_CONTACT_FAILED, 
        ADD_CONTACT_SUCCESS, WAITING, MODIFY_MESSAGE_CHAT,
        SEND_MESSAGE } from '../actions/types';

const INITIAL_STATE = {
    emailNewContact: '',
    errorAddContact: '',
    loading: false,
    registerIncluded: false,
    disabledButton: true,
    message: ''
};

export default (state = INITIAL_STATE, action) => {
    let lRet = {};
    console.log(action);
    switch (action.type) {
        case MODIFY_EMAIL_NEW_CONTACT:
            let disable = false;
            if (action.payload === '') {
                disable = true;
            }
            lRet = { ...state, emailNewContact: action.payload, disabledButton: disable, errorAddContact: '' };
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
        case MODIFY_MESSAGE_CHAT:
            lRet = { ...state, message: action.payload };
            break;
        case SEND_MESSAGE:
            lRet = { ...state, message: '' };
            break;
        default:
            lRet = state;
            break;
    }
    return lRet;
};
