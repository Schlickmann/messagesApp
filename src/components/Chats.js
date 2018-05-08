import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


export default class Chats extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Messages App',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { height: 60, },
        headerLeft: null,
        tabBarLabel: 'Chats',
        headerRight: (
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5, }}>
              <TouchableOpacity onPress={() => false}>
                <Text style={{ color: '#ADD8E6', fontFamily: 'Noteworthy', fontSize: 16, }}>Sair</Text>
              </TouchableOpacity>
            </View>
      )
    });

    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F8FF' }}>
              <Text style={{ fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' }}>Página dos chats</Text>
          </View>
        );
      }
}

