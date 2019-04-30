import React from 'react';
import { View, Image } from 'react-native';
import { Button } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { MainNavigator } from '../../common/navigator';

export default class Main extends React.Component {

  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MainNavigator user={this.props.user}/>
          {/* <View
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 5,
            }}>
            <Button
              style={{
                position: 'relative',
                left: '-50%',
                borderRadius: 50,
                backgroundColor: colors.WHITE,
                width: 90,
                height: 90,
              }}>
              <Image source={{uri:'https://is5-ssl.mzstatic.com/image/thumb/Purple125/v4/5e/a7/7e/5ea77e73-eeda-4eae-780d-e7fc655aa711/AppIcon-1x_U007emarketing-85-220-0-5.png/246x0w.jpg'}} style={{width:150, height:150}} />  
            </Button>
          </View> */}
        </View>
      </View>
    );
  }
}
