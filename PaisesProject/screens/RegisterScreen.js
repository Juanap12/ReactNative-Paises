import React from 'react';
import { ScrollView, StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import * as firebase from "firebase";

export default class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordVerify: "",
      response: ""
    };

    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        // User is signed in.
        this.props.navigation.navigate("Login");
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });

    this.register = this.register.bind(this);
  }

  static navigationOptions = {
    title: 'Register Paises App',
  };

  register() {
    if(this.state.password === this.state.passwordVerify){
      let email = this.state.username;
      let password = this.state.password;
      firebase.auth().createUserWithEmailAndPassword(email, password).then( () => {
        this.props.navigation.navigate("Login");
      }).catch( (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        this.setState({
          response: error.message
        });
        // ...
      });
    }else{
      this.setState({
        response: "Password fields must be equal"
      });
    }
  }

  render() {
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

        <TextInput
          style={{ height: 40 }}
          secureTextEntry={true}
          placeholder="Verify Password"
          onChangeText={passwordVerify => this.setState({ passwordVerify })}
        />

        <Button
          onPress={this.register}
          title="Register"
          color="#31891b"
          accessibilityLabel="Sign In to an awesome APP"
        />

        <Text style={{ color: "red" }}>{this.state.response}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

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
  firebase.initializeApp(firebaseConfig);
}


