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
      beans.push( this.getBeanImage(i));
    }

    return (
      <TouchableOpacity style={styles.container} onPress={this._onPressButton.bind(this)}>
        <View style={styles.button}>
          {beans}
        </View>
      </TouchableOpacity>
    );
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
    width: 260,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
});
