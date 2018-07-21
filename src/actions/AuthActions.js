import ImagePicker from 'react-native-image-picker';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { MODIFY_EMAIL, MODIFY_PASSWORD, MODIFY_NAME, 
        REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, 
        AUTH_USER_SUCCESS, AUTH_USER_FAILED, WAITING_LOGIN,
        PENDING_EMAIL_VERIFICATION, USER_LOUGOUT, USER_LOGOUT_FAILED,
        UPDATING_AVATAR } from './types';

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
                
                    firebase.database().ref(`/contacts/${emailB64}`).set({ name, profilePic: '' })
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
                        authUserSuccess(dispatch, navigate, userData, email); 
                    });    
                } else {
                    pendingEmailVerification(dispatch);
                }
            }
        })
        .catch(err => authUserFailed(dispatch, err));
    };

const authUserSuccess = (dispatch, navigate, userName, email) => {
    dispatch({
        type: AUTH_USER_SUCCESS
    });
    navigate('tabPage', { userName, email });
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

const options = {
    title: 'Select your Avatar',
    cameraType: 'front',
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'messagesApp/images',
      cameraRoll: true,
      waitUntilSaved: true,
    }
};

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, imageName, mime = 'image/jpg') => dispatch => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('profile').child(imageName);
        fs.readFile(uploadUri, 'base64')
        .then((data) => Blob.build(data, { type: `${mime};BASE64` }))
        .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          dispatch(updateUserData(url));
        })
        .catch((error) => { console.log(error); });
};

export const selectPhotoTapped = () => (dispatch) => {
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            dispatch({
                type: UPDATING_AVATAR,
                payload: source
            });
            const { currentUser } = firebase.auth();
            
            const namePicture = `avatar-${currentUser.email}`;
            dispatch(uploadImage(response.uri, namePicture));
        }
    });
};

export const updateUserData = (url) => (dispatch) => {
    const { currentUser } = firebase.auth();

    const emailUserB64 = b64.encode(currentUser.email);

    firebase.database().ref(`/contacts/${emailUserB64}`)
    .update({
        profilePic: url
    });
};

export const fetchAvatar = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        const emailUserB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/contacts/${emailUserB64}`)
            .on('value', (snapshot) => {
                const source = { uri: snapshot.val().profilePic };

                dispatch({ type: UPDATING_AVATAR, payload: source });
            });
    };
};
