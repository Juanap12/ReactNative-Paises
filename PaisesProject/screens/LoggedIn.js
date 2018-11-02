import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, FlatList,TouchableHighlight } from 'react-native';

export default class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            paises: [],
            endpoint: 'https://restcountries.eu/rest/v2/all?fields=name'

        };
    }
    componentDidMount() {
        this.getPaises();
    }

    getPaises = () => {
        this.setState({ loading: true })
        fetch(this.state.endpoint)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    paises: res,
                    loading: false
                })
            })
    };

    vewDetail(item){
        console.log(item.name);
    }
    render() {
        if (this.state.loading || this.state.paises.length == 0) {
            return (
                <View style={{ padding: 60 }}>
                    <Text> Downloading Countries </Text>
                </View>
            )
        } else if (!this.state.loading && this.state.paises.length != 0) {
            return (
                <View style={{marginTop:20}}>
                    <FlatList
                        data={this.state.paises}
                        renderItem={({item, separators}) => (
                            <TouchableHighlight 
                              onPress={() => this.vewDetail(item)}
                              onShowUnderlay={separators.highlight}
                              onHideUnderlay={separators.unhighlight}>
                              <View style={{backgroundColor: 'white'}}>
                                <Text style={{ fontSize: 25,margin: 15,}}>{item.name}</Text>
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

