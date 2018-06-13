import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { enableInclusionContact, userContactsFetch } from '../actions/AppActions';

class Contacts extends Component {

  static navigationOptions = () => ({
      headerTitle: 'Messages App',
      headerTintColor: '#ADD8E6',
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

    componentWillMount() {
      this.props.userContactsFetch();
      this.createDataSource(this.props.contacts);
    }

    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps.contacts);      
    }

    createDataSource(contacts) {
      //define a regra do listView utiliza para diferenciação das linhas
      const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => { row1 !== row2; } });
      
      //analisa as diferenças entre linhas para enviar para a lista
      this.data = ds.cloneWithRows(contacts);
    }

    _listUserContacts() {
      if (this.data) {
        return (
          <ListView
            enableEmptySections
            dataSource={this.data}
            renderRow={data => (
                  <View style={{ margin: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Verdana' }}>{data.name}</Text>
                    <Text>{data.email}</Text>
                  </View>
                )
              }
          />
        );
      }

      return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' }}>Página dos contatos</Text>
            </View>
      );
    }

    render() {
        return (
          <View style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
            {this._listUserContacts()}
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


const mapStateToProps = state => {
  const contacts = _.map(state.ListReducer, (val, uid) => ({ ...val, uid }));
  return { contacts };
};

export default connect(mapStateToProps, { enableInclusionContact, userContactsFetch })(Contacts);

