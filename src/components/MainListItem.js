import * as React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { colors } from '../common/colors';
import { Entypo, MaterialCommunityIcons, MaterialIcons, Foundation } from '@expo/vector-icons';
import { texts } from '../common/texts';
import { Actions } from 'react-native-router-flux';

export default class MainListItem extends React.Component {

  render() {
    const { image, position, money, title, iconColor, fav, sold, urgent } = this.props;
    return (
      <TouchableOpacity>
        <Flex style={{ backgroundColor: colors.WHITE }}>
          <View>
            <Image
              style={{ width: 100, height: 105 }}
              source={{
                uri: image,
              }}
            />
            {
              fav == 1 ? <View
                style={{
                  backgroundColor: colors.CYAN,
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  borderRadius: 30,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Foundation name="heart" size={14} color={colors.WHITE} />
              </View>
                : null
            }

            {
              sold == 1
                ? <Image
                  style={{ width: 40, height: 40, position: 'absolute', right: 0, bottom: 0 }}
                  source={{ uri: 'http://www.rhodesbarker.com/wp-content/themes/rhodes-barker/images/sold.png' }}
                />
                : null
            }

            {/* {
              urgent == 1
                ? <Image
                  style={{ width: 40, height: 40, position: 'absolute', left: 0, top: 0 }}
                  source={{ uri: 'http://www.thepeoplepod.co.uk/uploads/image/urgent_feature_box.png' }}
                />
                : null
            } */}

          </View>
          <Flex direction="column" align='start'>
            <Flex>
              <MaterialCommunityIcons
                name="broom"
                size={20}
                color={colors.ORANGE}
                style={{ marginLeft: 18 }}
              />
              <Text style={styles.listText1}>{title}</Text>
            </Flex>
            <Flex>
              <MaterialIcons
                name="near-me"
                size={20}
                color={colors.GREY2}
                style={{ marginLeft: 18 }}
              />
              <Text style={styles.listText2}>{position}</Text>
            </Flex>
            <Flex>
              <MaterialIcons
                name="monetization-on"
                size={20}
                color={colors.GREY2}
                style={{ marginLeft: 18 }}
              />
              <Text style={styles.listText1}> $ {money}</Text>
            </Flex>
          </Flex>
          <Flex style={{ position: 'absolute', right: 10 }}>
            <Entypo
              name="chevron-right"
              size={20}
              color={iconColor}
            />
          </Flex>
        </Flex>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listText1: texts.LISTTEXT,
  listText2: texts.CAPTION.SECONDARY,
});
