import React from 'react';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';
import LoggedIn from '../screens/LoggedIn';

import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Login: LoggedIn ,

}); 