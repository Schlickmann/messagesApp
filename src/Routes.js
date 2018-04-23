import React from 'react';
import { StackNavigator } from 'react-navigation';

import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';

const Routes = StackNavigator({
    login: { screen: FormLogin },
    register: { screen: FormRegister },
}, {
  initialRouteName: 'login',
  //navigationOptions: { title: 'JSD Consultoria', 
  //                      headerStyle: { height: 60, 
  //                      backgroundColor: '#c0c0c0' } }
});

export { Routes };
