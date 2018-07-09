import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { MODIFY_EMAIL, MODIFY_PASSWORD, MODIFY_NAME, 
        REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, 
        AUTH_USER_SUCCESS, AUTH_USER_FAILED, WAITING_LOGIN,
        PENDING_EMAIL_VERIFICATION, USER_LOUGOUT, USER_LOGOUT_FAILED } from './types';

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
    const emailUserB64 = b64.encode(email);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            if (user) {
                user.user.reload();
                if (user.user.emailVerified) {
                    firebase.database().ref(`/contacts/${emailUserB64}`)
                    .once('value')
                    .then(snapshot => {
                        const userData = _.first(_.values(snapshot.val()));
                        authUserSuccess(dispatch, navigate, userData.name); 
                    });    
                } else {
                    pendingEmailVerification(dispatch);
                }
            }
        })
        .catch(err => authUserFailed(dispatch, err));
    };

const authUserSuccess = (dispatch, navigate, userName) => {
    dispatch({
        type: AUTH_USER_SUCCESS
    });

    navigate('tabPage', { userName });
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

export const userLogOut = ({ navigate }) => (dispatch) => {
    dispatch({ type: WAITING_LOGIN });
    firebase.auth().signOut()
        .then(() => {
            // Sign-out successful.
            navigate('login');
            dispatch({ type: USER_LOUGOUT });
        })
        .catch(err => userLogOutFailed(dispatch, err));
};

const userLogOutFailed = (dispatch, erro) => {
    dispatch({
        type: USER_LOGOUT_FAILED,
        payload: erro.message
    });
};

export const updateUserData = ({ imageUrl }) => (dispatch) => {
    const { currentUser } = firebase.auth();

    const emailUserB64 = b64.encode(currentUser.email);

    firebase.database().ref(`/contacts/${emailUserB64}`)
    .once('value')
    .then(snapshot => {
        if (snapshot.val()) {
            const userData = _.first(_.values(snapshot.val())); 
            firebase.database().ref(`/contacts/${emailUserB64}`)
            .set({
                name: userData.name,
                profilePic: imageUrl
            });
        }
    });
};
