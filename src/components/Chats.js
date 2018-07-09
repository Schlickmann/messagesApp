import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableHighlight, ListView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchOldChats } from '../actions/AppActions';
import { userLogOut } from '../actions/AuthActions';

class Chats extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Messages App',
        headerTitleStyle: { fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' },
        headerStyle: { height: 60, },
        tabBarLabel: 'Chats',
        headerLeft: null
    });

    componentWillMount() {
      this.props.fetchOldChats();
      this.createDataSource(this.props.contacts);
    }

    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps.contacts);      
    }

    _logOut() {
      const { navigate } = this.props.navigation;

      this.props.userLogOut(navigate);
    }

    createDataSource(contacts) {
      //define a regra do listView utiliza para diferenciação das linhas
      const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => { row1 !== row2; } });
      
      //analisa as diferenças entre linhas para enviar para a lista
      this.data = ds.cloneWithRows(contacts);
    }

    _renderRow(contact) {
      const { navigate } = this.props.navigation;
      return (
        <TouchableHighlight onPress={() => { navigate('chat', { contactName: contact.name, contactEmail: contact.email }); }} underlayColor="#fff" >
          <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderColor: '#CCC' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Verdana' }}>{contact.name}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Verdana' }}>{contact.email}</Text>
          </View>
        </TouchableHighlight>
      );
    }

    _listUserChats() {
      if (this.data._cachedRowCount > 0) {
        return (
          <ListView
            enableEmptySections
            dataSource={this.data}
            renderRow={data => this._renderRow(data)}
          />
        );
      }

      return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 25, color: '#ADD8E6', fontFamily: 'Noteworthy' }}>Página dos chats</Text>
            </View>
      );
    }

    render() {
      return (
        <View style={{ flex: 1, backgroundColor: '#F0F8FF' }}>
          {this._listUserChats()}
        </View>
      );
      }
}

const mapStateToProps = state => {
  const contacts = _.map(state.OldChatsReducer, (val, uid) => ({ ...val, uid }));
  return { contacts };
};

export default connect(mapStateToProps, { fetchOldChats, userLogOut })(Chats);
