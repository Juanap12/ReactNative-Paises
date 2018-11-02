import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, FlatList, TouchableHighlight } from 'react-native';

export default class Detail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            endpoint: 'https://restcountries.eu/rest/v2/name/',
            details : [],
        };

    }

    componentDidMount() {
        this.getDetail();
    }
    getDetail = () => {
        const { navigation } = this.props;
        let itemId = navigation.getParam('itemId', 'NO-ID');
        this.state.endpoint = this.state.endpoint + itemId + '?fullText=true';
        this.setState({ loading: true })
        fetch(this.state.endpoint)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    details: res,
                    loading: false
                })
            })
    };

    render() {
        console.log(this.state.endpoint);
        console.log(this.state.details); 
        if (this.state.loading || this.state.details.length == 0) {
            return (
                <View style={{ padding: 60 }}>
                    <Text> Downloading Countries </Text>
                </View>
            )
        } else if (!this.state.loading && this.state.details.length != 0) {
            return (
                <View>
                    <Text> Cargagos</Text>
                </View>
            );
        }
    }
}