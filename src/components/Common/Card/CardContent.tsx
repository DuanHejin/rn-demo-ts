import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export interface CardContentProps {
}

export interface CardContentState {
}

export default class CardContent extends React.Component<CardContentProps, CardContentState> {
  constructor(props: CardContentProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const { children } = this.props;
    return (
      <View style={styles.wrap}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 15,
  }
});
