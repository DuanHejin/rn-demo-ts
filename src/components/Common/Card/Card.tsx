import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from '@/components/Touchable';

export interface CardProps {
  onPress?: () => void,
}

export default class CardComponent extends React.Component<CardProps, any> {
  constructor(props: CardProps) {
    super(props);
  }

  renderContent() {
    const { children } = this.props;
    return (
      <View style={styles.wrap}>
        <View style={styles.container}>
          {children}
        </View>
      </View>
    );
  }

  public render() {
    const { onPress } = this.props;
    if (typeof onPress === 'function') {
      return (
        <Touchable onPress={onPress}>
          {this.renderContent()}
        </Touchable>
      );
    }
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    marginTop: 0,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
});