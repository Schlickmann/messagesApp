import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';


export default class Contacts extends Component {

  static navigationOptions =({ navigation }) => ({
      headerTitle: 'Messages App',
      headerTintColor: 'white',
      headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy', },
      headerStyle: { height: 60, },
      headerLeft: null,
      tabBarLabel: 'Contacts',
      headerRight: (
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5, }}>
            <TouchableOpacity onPress={() => navigation.navigate('addContact')}>
              <Image style={{ margin: 10, width: 25, height: 25, tintColor: '#ADD8E6' }} source={require('../images/addContact.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => false}>
              <Text style={{ color: '#ADD8E6', fontFamily: 'Noteworthy', fontSize: 16, }}>Sair</Text>
            </TouchableOpacity>
          </View>
    )
  });

    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F8FF' }}>
              <Text style={{ fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' }}>Página dos contatos</Text>
          </View>
        );
      }
}

