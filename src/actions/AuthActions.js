import firebase from 'firebase';
import b64 from 'base-64';

export const modifyEmail = (text) => ({
        type: 'modify_email',
        payload: text
    });

export const modifyPassword = (text) => ({
    type: 'modify_password',
    payload: text
});

export const modifyName = (text) => ({
    type: 'modify_name',
    payload: text
});

export const registerUser = ({ name, email, password, navigate }) => {
    return (dispatch) => {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then(user => {
                    const emailB64 = b64.encode(email);
                    
                    firebase.database().ref(`/contatos/${emailB64}`).push({ name })
                        .then(value => registerUserSuccess(dispatch, navigate));
            })
            .catch(err => registerUserFailed(err, dispatch));
    };
};
   

const registerUserSuccess = (dispatch, navigate) => {
    dispatch({
            type: '', // return literal object (action) 
    });

    navigate('welcome');
};

const registerUserFailed = (error, dispatch) => {
    dispatch({
        type: 'register_user_error',
        payload: error.message
    });
};
