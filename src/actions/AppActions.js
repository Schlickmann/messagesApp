import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import { MODIFY_EMAIL_NEW_CONTACT, ADD_CONTACT_SUCCESS, 
        ADD_CONTACT_FAILED, WAITING, LIST_USER_CONTACTS,
        MODIFY_MESSAGE_CHAT } from './types';

export const modifyEmailNewContact = (text) => ({
    type: MODIFY_EMAIL_NEW_CONTACT,
    payload: text
});

export const addContact = ({ emailNewContact, navigate }) =>
    //template string `exemplo ${variavel}`
    (dispatch) => {
        dispatch({ type: WAITING });
        const emailB64 = b64.encode(emailNewContact);
        firebase.database().ref(`/contacts/${emailB64}`) //CRIA
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    //converte objeto para array (_.values()) e pega o primeiro indice do array (_.first())
                    const userData = _.first(_.values(snapshot.val())); 

                    const { currentUser } = firebase.auth();
                    
                    if (emailNewContact === currentUser.email) {
                        addContactFailed('You cannot to add yourself.', dispatch);
                    } else {
                        const emailUserB64 = b64.encode(currentUser.email);

                        firebase.database().ref(`/user_contacts/${emailUserB64}`).orderByChild('email').equalTo(emailNewContact) 
                        .once('value')
                        .then(verify => {
                            if (verify.val()) {
                                addContactFailed('You already have this contact in your contact list.', dispatch);
                            } else {
                                firebase.database().ref(`/user_contacts/${emailUserB64}`)
                                    .push({ email: emailNewContact, name: userData.name })
                                    .then(() => { addContactSuccess(dispatch, navigate); })
                                    .catch(err => { addContactFailed(err.message, dispatch); });
                            }
                        });
                    }
                } else {
                    addContactFailed('The contact informed does not exist.', dispatch);
                }
            });
};

const addContactSuccess = (dispatch, navigate) => {
    dispatch({
            type: ADD_CONTACT_SUCCESS, // return literal object (action) 
            payload: true
    });

    //navigate('tabPage');
};

const addContactFailed = (error, dispatch) => {
    dispatch({
        type: ADD_CONTACT_FAILED,
        payload: error
    });
};

export const enableInclusionContact = () => (
    {
        type: ADD_CONTACT_SUCCESS,
        payload: false
    }
);

export const userContactsFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        const emailUserB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/user_contacts/${emailUserB64}`)
            .on('value', (snapshot) => {
                dispatch({ type: LIST_USER_CONTACTS, payload: snapshot.val() });
            });
    };
};

export const modifyMessageChat = (text) => ({
    type: MODIFY_MESSAGE_CHAT,
    payload: text
});
