import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bold}>Promotion</Text>

        <Text style={{fontSize:18, fontWeight:'300'}}> {'10% discount on 3rd Stamp'}</Text>
        <Text style={{fontSize:18, fontWeight:'300'}}> {'20% discount on 5th Stamp'}</Text>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  bold:{
    fontSize:25,
    color:'#111',
    lineHeight:64,
    fontFamily: 'Muli'
  }
});