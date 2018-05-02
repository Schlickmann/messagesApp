const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    errorRegister: ''
};

export default (state = INITIAL_STATE, action) => {
    let lRet = {};
    console.log(action);
    switch (action.type) {
        case 'modify_email':
            lRet = { ...state, email: action.payload };
            break;
        case 'modify_password':
            lRet = { ...state, password: action.payload };
            break;
        case 'modify_name':
            lRet = { ...state, name: action.payload };
            break;
        case 'register_user_error':
            lRet = { ...state, errorRegister: action.payload };
            break;
        case 'register_user_success':
            lRet = { ...state, name: '', password: '', errorRegister: '' };
            break;      
        default:
            lRet = { ...state };
            break;
    }

    return lRet;
};
