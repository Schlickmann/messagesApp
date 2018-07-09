import { MODIFY_EMAIL, MODIFY_PASSWORD, MODIFY_NAME, 
    REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, 
    AUTH_USER_SUCCESS, AUTH_USER_FAILED, WAITING_LOGIN,
    PENDING_EMAIL_VERIFICATION, USER_LOUGOUT, USER_LOGOUT_FAILED } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    errorRegister: '',
    errorAuth: '',
    loadingLogin: false,
};

export default (state = INITIAL_STATE, action) => {
    let lRet = {};
    switch (action.type) {
        case MODIFY_EMAIL:
            lRet = { ...state, email: action.payload };
            break;
        case MODIFY_PASSWORD:
            lRet = { ...state, password: action.payload };
            break;
        case MODIFY_NAME:
            lRet = { ...state, name: action.payload };
            break;
        case REGISTER_USER_FAILED:
            lRet = { ...state, errorRegister: action.payload, loadingLogin: false };
            break;
        case REGISTER_USER_SUCCESS:
            lRet = { ...state, name: '', password: '', errorRegister: '', loadingLogin: false };
            break;
        case AUTH_USER_FAILED:
            lRet = { ...state, errorAuth: action.payload, loadingLogin: false };
            break;
        case AUTH_USER_SUCCESS:
            lRet = { ...state, email: '', password: '', errorAuth: '', loadingLogin: false };
            break;
        case WAITING_LOGIN:
            lRet = { ...state, loadingLogin: true };
            break;
        case PENDING_EMAIL_VERIFICATION:
            lRet = { ...state, errorAuth: action.payload, password: '', loadingLogin: false };
            break; 
        case USER_LOUGOUT:
            lRet = { ...state, loadingLogin: false };
            break; 
        case USER_LOGOUT_FAILED:
            lRet = { ...state, loadingLogin: false, errorAuth: action.payload };
            break;         
        default:
            lRet = { ...state };
            break;
    }

    return lRet;
};
