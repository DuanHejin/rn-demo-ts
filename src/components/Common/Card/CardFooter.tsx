import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export interface CardFooterProps {
  wrapStyle?: object,
}

export interface CardFooterState {
}

export default class CardFooter extends React.Component<CardFooterProps, CardFooterState> {
  constructor(props: CardFooterProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const { children, wrapStyle } = this.props;
    return (
      <View style={[styles.wrap, wrapStyle, !children ? styles.withoutContent : {}]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopColor: '#E2E4E8',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  withoutContent: {
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 0,
  },
});