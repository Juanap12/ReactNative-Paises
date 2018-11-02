import React from 'react';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';
import LoggedIn from '../screens/LoggedIn';

let HomeUser = new createStackNavigator({
  Login: LoggedIn
})

import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  User: HomeUser ,

}); 