import firebase from 'firebase';
import b64 from 'base-64';
import { MODIFY_EMAIL, MODIFY_PASSWORD, MODIFY_NAME, 
        REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, 
        AUTH_USER_SUCCESS, AUTH_USER_FAILED, WAITING_LOGIN,
        PENDING_EMAIL_VERIFICATION } from './types';

export const modifyEmail = (text) => ({
        type: MODIFY_EMAIL,
        payload: text
    });

export const modifyPassword = (text) => ({
    type: MODIFY_PASSWORD,
    payload: text
});

export const modifyName = (text) => ({
    type: MODIFY_NAME,
    payload: text
});

export const registerUser = ({ name, email, password, navigate }) => 
    //template string `exemplo ${variavel}`
     (dispatch) => {
        dispatch({ type: WAITING_LOGIN });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(currentUser => {
                const user = firebase.auth().currentUser;
                user.sendEmailVerification().then(user => {
                    console.log('email enviado...');
                    const emailB64 = b64.encode(email);
                
                    firebase.database().ref(`/contacts/${emailB64}`).push({ name })
                        .then(value => registerUserSuccess(dispatch, navigate));
            }).catch(err => { console.log(err); }); 
        })
            .catch(err => registerUserFailed(err, dispatch));
}; 

const registerUserSuccess = (dispatch, navigate) => {
    dispatch({
            type: REGISTER_USER_SUCCESS, // return literal object (action) 
    });

    navigate('welcome');
};

const registerUserFailed = (error, dispatch) => {
    dispatch({
        type: REGISTER_USER_FAILED,
        payload: error.message
    });
};

export const authUser = ({ email, password, navigate }) => (dispatch) => {
    dispatch({ type: WAITING_LOGIN });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            if (user) {
                user.user.reload();
                console.log(user.user.emailVerified);
                if (user.user.emailVerified) {
                    authUserSuccess(dispatch, navigate);     
                } else {
                    pendingEmailVerification(dispatch);
                }
            }
        })
        .catch(err => authUserFailed(dispatch, err));
    };

const authUserSuccess = (dispatch, navigate) => {
    dispatch({
        type: AUTH_USER_SUCCESS
    });

    navigate('tabPage');
};

const authUserFailed = (dispatch, erro) => {
    dispatch({
        type: AUTH_USER_FAILED,
        payload: erro.message
    });
};

const pendingEmailVerification = (dispatch) => {
    dispatch({
        type: PENDING_EMAIL_VERIFICATION,
        payload: 'The email entered in the registration has not yet been validated.'
                    + 'Please check your email box.'
    });
};
