import React, { Component } from "react";
import { AppRegistry, Text, TextInput, View, Button } from "react-native";

import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      response: ""
    };

    this.logIn = this.logIn.bind(this);
  }

  static navigationOptions = {
    title: "Paises App"
  };

  logIn() {
    let email = this.state.username;
    let contra = this.state.password;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, contra)
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        this.setState({
          response: error.message
        })
        // ...
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Email Address"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          style={{ height: 40 }}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />

        <Button
          onPress={this.logIn}
          title="Sign In"
          color="#ff0000"
          accessibilityLabel="Sign In to an awesome APP"
        />

        <Text style={{ color: "red" }}>{this.state.response}</Text>
      </View>
    );
  }
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkLX-L3lR23UMJ6mjlvU_9x3scA-7xyMc",
  authDomain: "reactnative-paises.firebaseapp.com",
  databaseURL: "https://reactnative-paises.firebaseio.com",
  projectId: "reactnative-paises",
  storageBucket: "reactnative-paises.appspot.com",
  messagingSenderId: "195162408637"
};
if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
}
