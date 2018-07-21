import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import { MODIFY_EMAIL_NEW_CONTACT, ADD_CONTACT_SUCCESS, 
        ADD_CONTACT_FAILED, WAITING, LIST_USER_CONTACTS,
        MODIFY_MESSAGE_CHAT, SEND_MESSAGE, LIST_USER_CHATS,
        LIST_ALL_USER_CHATS } from './types';

export const modifyEmailNewContact = (text) => ({
    type: MODIFY_EMAIL_NEW_CONTACT,
    payload: text
});

export const addContact = ({ emailNewContact, navigate }) =>
    //template string `exemplo ${variavel}`
    (dispatch) => {
        dispatch({ type: WAITING });
        const emailB64 = b64.encode(emailNewContact);
        firebase.database().ref(`/contacts/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    //converte objeto para array (_.values()) e pega o primeiro indice do array (_.first())
                    const userData = _.first(_.values(snapshot.val())); 
                    const profilePic = snapshot.val().profilePic;

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
                                    .push({ email: emailNewContact, name: userData, profilePic })
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

export const userContactsFetch = () => (dispatch) => {
        const { currentUser } = firebase.auth();
        const emailUserB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/user_contacts/${emailUserB64}`)
            .on('value', (snapshot) => {
                dispatch({ type: LIST_USER_CONTACTS, payload: snapshot.val() });
            });
};
export const modifyMessageChat = (text) => ({
    type: MODIFY_MESSAGE_CHAT,
    payload: text
});

export const sendMessage = (message, contactName, contactEmail) => {
    const { currentUser } = firebase.auth();
    const emailUser = currentUser.email;

    return (dispatch) => {
        const emailUserB64 = b64.encode(emailUser);
        const contactEmailB64 = b64.encode(contactEmail);
        firebase.database().ref(`/messages/${emailUserB64}/${contactEmailB64}`)
            .push({ message, type: 'sent' })
                .then(() => {
                    firebase.database().ref(`/messages/${contactEmailB64}/${emailUserB64}`)
                    .push({ message, type: 'received' })
                        .then(() => { dispatch({ type: SEND_MESSAGE, }); });
                })
                .then(() => {
                    firebase.database().ref(`/contacts/${contactEmailB64}`)
                    .once('value')
                    .then(contact => {
                        firebase.database().ref(`/chats_user/${emailUserB64}/${contactEmailB64}`)
                        .set({ name: contactName, email: contactEmail, profilePic: contact.val().profilePic });
                    }); 
                })
                .then(() => {
                    firebase.database().ref(`/contacts/${emailUserB64}`)
                        .once('value')
                        .then(snapshot => {
                            const userData = _.first(_.values(snapshot.val()));
                            firebase.database().ref(`/chats_user/${contactEmailB64}/${emailUserB64}`)
                            .set({ name: userData, email: emailUser, profilePic: snapshot.val().profilePic });
                        });
                });
    };
};

export const fetchUserChat = (contactEmail) => {
    const { currentUser } = firebase.auth();
    const emailUserB64 = b64.encode(currentUser.email);
    const contactEmailB64 = b64.encode(contactEmail);

    return (dispatch) => {
        firebase.database().ref(`/messages/${emailUserB64}/${contactEmailB64}`)
            .on('value', snapshot => {
                dispatch({ type: LIST_USER_CHATS, payload: snapshot.val() });
            });
    };
};

export const fetchOldChats = () => {
    const { currentUser } = firebase.auth();
    
        return (dispatch) => {
            const emailUserB64 = b64.encode(currentUser.email);
    
            firebase.database().ref(`/chats_user/${emailUserB64}`)
                .on('value', (snapshot) => {
                    dispatch({ type: LIST_ALL_USER_CHATS, payload: snapshot.val() });
                });
        }; 
};

