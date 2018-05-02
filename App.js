//imports react
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
//imports redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'; //trata retorno de actions que trabalham de forma assincrona.
//imports database - firebase
import firebase from 'firebase';

//import my components
import { Routes } from './src/Routes';
import reducers from './src/reducers';

export default class App extends Component {
  
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDJNQLZ5FrEKeZxFPDzYfHsqBXZi_YYEGE',
      authDomain: 'messageapp-c5718.firebaseapp.com',
      databaseURL: 'https://messageapp-c5718.firebaseio.com',
      projectId: 'messageapp-c5718',
      storageBucket: 'messageapp-c5718.appspot.com',
      messagingSenderId: '138468790070'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Routes />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', //AliceBlue
  },
});
