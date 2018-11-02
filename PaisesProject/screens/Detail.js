import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableHighlight
} from "react-native";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      endpoint: "https://restcountries.eu/rest/v2/name/",
      details: []
    };
  }

  componentDidMount() {
    this.getDetail();
  }
  getDetail = () => {
    const { navigation } = this.props;
    let itemId = navigation.getParam("itemId", "NO-ID");
    this.state.endpoint =
      this.state.endpoint +
      itemId +
      "?fields=capital;population;currencies;area;gini;latlng;alpha2Code";
    this.setState({ loading: true });
    fetch(this.state.endpoint)
      .then(res => res.json())
      .then(res => {
        this.setState({
          details: res,
          loading: false
        });
      });
  };

  render() {
    if (this.state.loading || this.state.details.length == 0) {
      return (
        <View style={{ padding: 60 }}>
          <Text> Downloading Countries </Text>
        </View>
      );
    } else if (!this.state.loading && this.state.details.length != 0) {
      console.log(this.state.details);
      let pais = this.state.details[0];
      pais.gini = "Vacío";
      return (
        <View>
          <Text> Capital: {pais.capital}</Text>
          <Text> Population: {pais.population}</Text>
          <Text> Currency: {pais.currencies[0].name}</Text>
          <Text> Area: {pais.area}</Text>
          <Text> Gini: {pais.gini}</Text>
          <Text>
            {" "}
            Latitude: {pais.latlng[0].toFixed(2)} Longitud: {pais.latlng[1].toFixed(2)}
          </Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri:
                "https://www.countryflags.io/"+pais.alpha2Code+"/flat/64.png"
            }}
          />
        </View>
      );
    }
  }
}
