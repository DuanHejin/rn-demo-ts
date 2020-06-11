import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ItemInfo } from '../utils';
import CardHeaderComponent from './CardHeader';
import CardContentComponent from './CardContent';
import CardFooterComponent from './CardFooter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getWidth } from '@/utils/index';

export interface CardProps {
  item: ItemInfo,
  onPress: () => void,
}

export default class CardComponent extends React.Component<CardProps, any> {
  constructor(props: CardProps) {
    super(props);
  }

  public render() {
    const { item, onPress } = this.props;
    const {
      title: headerRight,
      subTitle: headerLeft,
      leftBottomIcon,
      currentPrice,
      originalPrice,
      rightBottomMemo
    } = item;
    const headerProps = {
      headerLeft,
      headerRight,
    };
    const footerProps = {
      leftBottomIcon,
      currentPrice,
      originalPrice,
      rightBottomMemo
    };
    return (
      <View style={styles.wrap}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPress}>
            <CardHeaderComponent {...headerProps}></CardHeaderComponent>
            <CardContentComponent></CardContentComponent>
          </TouchableOpacity>
          <CardFooterComponent {...footerProps}></CardFooterComponent>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    marginTop: 0,
    padding: 10,
  },
  container: {
    flex: 1,
    // height: 150,
  },
});