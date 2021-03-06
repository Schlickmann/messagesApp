import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ListView, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchOldChats } from '../actions/AppActions';

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

    createDataSource(contacts) {
      //define a regra do listView utiliza para diferenciação das linhas
      const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => { row1 !== row2; } });
      
      //analisa as diferenças entre linhas para enviar para a lista
      this.data = ds.cloneWithRows(contacts);
    }

    _renderRow(contact) {
      const { navigate } = this.props.navigation;
      return (
        <TouchableHighlight onPress={() => { navigate('chat', { contactName: contact.name, contactEmail: contact.email, profilePic: contact.profilePic }); }} underlayColor="#fff" >
          <View style={{ flex: 1, padding: 15, borderBottomWidth: 1, borderColor: '#CCC', flexDirection: 'row' }}>
          <View style={{ marginRight: 5 }}>
            { contact.profilePic === '' ? <Image style={styles.ImageContainer} source={require('../images/user.png')} /> :
              <Image style={styles.ImageContainer} source={{ uri: contact.profilePic }} />
            }
              
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Verdana' }}>{contact.name}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Verdana' }}>{contact.email}</Text>
          </View>
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

const styles = {
  ImageContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    borderColor: '#ADD8E6',
    borderWidth: 1 / PixelRatio.get(),
    backgroundColor: '#4682B4',
    
  },
};

const mapStateToProps = state => {
  const contacts = _.map(state.OldChatsReducer, (val, uid) => ({ ...val, uid }));
  return { contacts };
};

export default connect(mapStateToProps, { fetchOldChats })(Chats);
