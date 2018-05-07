import React, { Component } from 'react';
import { View, Text } from 'react-native';


export default class Main extends Component {
    static navigationOptions = {
        headerTitle: 'Chats',
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { backgroundColor: '#4682B4', 
                        height: 60,
                     },
        headerLeft: null,
    };

      render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF', //AliceBlue
      },
};

