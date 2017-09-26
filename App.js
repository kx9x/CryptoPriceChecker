import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, WebView } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numBeans: 2
    };
  }

  _onPressButton() {
    this.setState({numBeans: this.state.numBeans + 1});
  }

  getBeanImage(num) {
    return <Image key={num} source={require('./bitbean.png')}/>
  }

  render() {

    const beans = [ this.getBeanImage(0) ];

    for (var i = 1; i < this.state.numBeans; i += 1) {
      beans.push( this.getBeanImage(i) );
    }

    return (
      <View style={styles.container} >
        {/*
        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <View style={styles.button}>
            {beans}
          </View>
        </TouchableOpacity>
        */}
        <View>
            <BitbeanMarket/>
        </View>
      </View>
    );
  }
}

class BitbeanMarket extends React.Component {

  constructor(props) {
    super(props);
    this.state = {items:[]}
  }

  _onPressButton() {
  }

  componentDidMount() {
    fetch('https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-bitb').then(result=> {
      this.setState({items: [result.json()] })}
    ).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return(
      <TouchableOpacity onPress={this._onPressButton.bind(this)}>
        <View>
          <Text>Items:</Text>
          <Text>{JSON.stringify(this.state.items)} </Text>
        </View>
      </TouchableOpacity>)
      
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
