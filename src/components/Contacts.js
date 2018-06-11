import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { enableInclusionContact } from '../actions/AppActions';

class Contacts extends Component {

  static navigationOptions = () => ({
      headerTitle: 'Messages App',
      headerTintColor: 'white',
      headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy', },
      headerStyle: { height: 60, },
      headerLeft: null,
      tabBarLabel: 'Contacts',
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
          <View style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' }}>Página dos contatos</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <View style={{ width: 45, height: 45, backgroundColor: '#4682B4', borderRadius: 50, justifyContent: 'flex-end', alignItems: 'center', margin: 10 }}>
                <TouchableOpacity onPress={() => { this.props.enableInclusionContact(); this.props.navigation.navigate('addContact'); }}>
                  <Image style={{ margin: 10, width: 30, height: 30, tintColor: '#ADD8E6' }} source={require('../images/addContact.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }
}

export default connect(null, { enableInclusionContact })(Contacts);

