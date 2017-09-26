import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, WebView } from 'react-native';

export default class App extends React.Component {

  getBeanImage() {
    return <Image source={require('./bitbean.png')}/>
  }

  constructor(props) {
    super(props);
    this.state = {market:{}}
    this.setMarket()
  }

  setMarket() {
    fetch('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-bitb').then(response => response.json())
    .then(response => {
      this.setState({market: response}, function() {
      this.render()
    })}).catch((error) => {
      console.error(error);
    });
  }

  _onPressButton() {
    this.setMarket()
  }

  componentDidMount() {
    this.setMarket()
  }


  render() {
    function Market(props) {
      if (props.jsonMarket["success"]) {
        const res = props.jsonMarket["result"][0]
        return <TouchableOpacity onPress={props.binder._onPressButton.bind(props.binder)} style={styles.container}>
               <View style={styles.button}>
               <Image source={require('./bitbean.png')}/> 
               <Text>{res["MarketName"]}</Text>
               <Text>High: {res["High"]} Low: {res["Low"]}</Text>
               <Text>Volume: {res["Volume"]} Last: {res["Last"]}</Text>
               <Text>Open Buys: {res["OpenBuyOrders"]} Open Sells: {res["OpenSellOrders"]}</Text>
               </View>
               </TouchableOpacity>
      } else {
        return <TouchableOpacity onPress={props.binder._onPressButton.bind(props.binder)} style={styles.container}>
               <View style={styles.button}>
               <Image source={require('./bitbean.png')}/> 
               <Text>Failure</Text>
               </View>
               </TouchableOpacity>
      }
    }
    return(<Market jsonMarket={this.state.market} binder={this} />)
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  maintext: {
    fontSize: 40
  },
  button: {
    marginBottom: 30,
    width: 265,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
});
