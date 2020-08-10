import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export interface OverlayTipsProps {
  wrapStyle?: object,
}

export interface OverlayTipsState {
}

export default class OverlayTips extends React.Component<OverlayTipsProps, OverlayTipsState> {
  constructor(props: OverlayTipsProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const { children, wrapStyle } = this.props;
    return (
      <View style={[styles.wrap, wrapStyle]}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'column',
  },
});