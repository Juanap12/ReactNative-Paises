import React, { Component } from "react";
import { Text, Button, View, FlatList, TouchableHighlight } from "react-native";

import * as firebase from "firebase";

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      paises: [],
      endpoint: "https://restcountries.eu/rest/v2/all?fields=name"
    };
    this.viewDetail = this.viewDetail.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  static navigationOptions = {
    title: "Paises App"
  };

  componentDidMount() {
    this.getPaises();
  }

  getPaises = () => {
    this.setState({ loading: true });
    fetch(this.state.endpoint)
      .then(res => res.json())
      .then(res => {
        this.setState({
          paises: res,
          loading: false
        });
      });
  };

  viewDetail(item) {
    console.log(item.name);
    this.props.navigation.navigate("Det", {
      itemId: item.name
    });
  }

  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.navigation.navigate("Main");
      })
      .catch(error => {
        // An error happened.
      });
  }

  render() {
    if (this.state.loading || this.state.paises.length == 0) {
      return (
        <View style={{ padding: 60 }}>
          <Text> Downloading Countries </Text>
        </View>
      );
    } else if (!this.state.loading && this.state.paises.length != 0) {
      return (
        <View>
          <Button
            onPress={this.signOut}
            title="Sign Out"
            color="#ff0000"
            accessibilityLabel="Sign out from the app"
          />
          <FlatList
            style={{ marginTop: 20 }}
            data={this.state.paises}
            renderItem={({ item, separators }) => (
              <TouchableHighlight
                onPress={() => this.viewDetail(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
              >
                <View style={{ backgroundColor: "white" }}>
                  <Text style={{ fontSize: 25, margin: 15 }}>{item.name}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
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
    firebase.initializeApp(firebaseConfig);
  }