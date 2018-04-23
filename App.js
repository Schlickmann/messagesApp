import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Routes } from './src/Routes';
import reducers from './src/reducers';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={createStore(reducers)}>
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
