import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';
import Welcome from './components/Welcome';
import Main from './components/Main';
//import Chats from './components/Chats';
import Contacts from './components/Contacts';

const TabPage = TabNavigator({
  chatsPage: { screen: Main },
  contactsPage: { screen: Contacts }
}, {
  tabBarPosition: 'top',
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
    }
  }
});

const Routes = StackNavigator({
    login: { screen: FormLogin },
    register: { screen: FormRegister },
    welcome: { screen: Welcome },
    //main: { screen: Main },
    tabPage: {
      screen: TabPage
    }
}, {
  initialRouteName: 'login',
  //navigationOptions: { title: 'JSD Consultoria', 
  //                      headerStyle: { height: 60, 
  //                      backgroundColor: '#c0c0c0' } }
});

export { Routes };
