import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { getWidth } from '@/utils/index';

export interface CardFooterProps {
  leftBottomIcon?: any,
  currentPrice: number,
  originalPrice: number,
  rightBottomMemo?: string,
}

export interface CardFooterState {
}

export default class CardFooterComponent extends React.Component<CardFooterProps, CardFooterState> {
  constructor(props: CardFooterProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const {
      leftBottomIcon,
      currentPrice,
      originalPrice,
      rightBottomMemo
    } = this.props;
    console.log('leftBottomIcon :>> ', leftBottomIcon);
    return (
      <View style={styles.wrap}>
        <View style={styles.leftArea}>
          <View style={styles.leftBottomIconStyle}>
            <Image style={{ width: '100%', height: '100%' }} source={require("@/assets/xsms.png")} />
          </View>
          <View style={styles.leftBottomPriceStyle}>
            <Text>
              <Text>{currentPrice}</Text>
              <Text> {originalPrice}</Text>
            </Text>
          </View>
        </View>
        <View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
  },
  leftArea: {
    width: getWidth(55),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBottomIconStyle: {
    height: 20,
    width: 100,
  },
  leftBottomPriceStyle: {

  },
});