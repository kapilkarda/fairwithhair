import React from 'react';
import { StyleSheet, Image, View, WebView } from 'react-native';
import { WhiteSpace } from 'antd-mobile-rn'

export default class App extends React.Component {
  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BANNERS.WIDTH-20, height: BANNERS.HEIGHT }}
          source={{ uri: image }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container} >
      

        <WhiteSpace />

        <WebView
          source={{ uri: 'https://www.instagram.com/fairwithhair/' }}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          style={{ flex: 1 }}
        />

        <WhiteSpace />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:10
  },
});