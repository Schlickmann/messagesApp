import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';


export default class Main extends Component {
    static navigationOptions = {
        headerTitle: 'Messages App',
        headerTintColor: 'white',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { backgroundColor: '#4682B4', 
                        height: 60,
                     },
        headerLeft: null,
        tabBarLabel: 'Chats',
        /*tabBarIcon: () => (
          <Image 
            style={{ width: 22, height: 22, tintColor: '#F0F8FF' }} 
            source={require('../images/chats.png')} 
          />
        )*/
    };

    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F8FF' }}>
              <Text style={{ fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' }}>Página dos chats</Text>
          </View>
        );
      }
}

