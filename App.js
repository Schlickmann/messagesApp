import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { FormLogin } from './src/components/FormLogin';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FormLogin />
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
