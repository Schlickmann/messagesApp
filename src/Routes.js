import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';
import Welcome from './components/Welcome';
import Chats from './components/Chats';
import Chat from './components/Chat';
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import Profile from './components/Profile';

const TabPage = TabNavigator({
  chatsPage: { screen: Chats },
  contactsPage: { screen: Contacts },
  profile: { screen: Profile }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#ADD8E6',
    activeBackgroundColor: '#4682B4',
    inactiveTintColor: '#4682B4',
    inactiveBackgroundColor: '#ADD8E6',
    labelStyle: {
      fontFamily: 'Noteworthy',
      fontSize: 18,
      padding: 10,
    },
    style: {
      borderTopWidth: 0,
      elevation: 4,
    }
  },
});

const Routes = StackNavigator({
    login: { screen: FormLogin },
    register: { screen: FormRegister },
    welcome: { screen: Welcome },
    addContact: { screen: AddContact },
    chat: { screen: Chat },
    tabPage: { screen: TabPage, }
}, {
  initialRouteName: 'login',
  navigationOptions: { 
    headerBackTitle: 'back',
    headerStyle: { backgroundColor: '#4682B4', 
                    borderBottomWidth: 0,
                    elevation: 0, 
                  } }
});

export { Routes };
