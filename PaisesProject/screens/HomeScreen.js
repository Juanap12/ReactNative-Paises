import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View,Button } from 'react-native';
import { createSwitchNavigator } from "react-navigation";


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    
    };
  };



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
          <TextInput
          style={{height: 40}}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />

        <Button
        onPress={() =>
          navigate('Login')}
        title="Sign In"
        color="#ff0000"
        accessibilityLabel="Sign In to an awesome APP"
      />

      </View>
    );
  }
}