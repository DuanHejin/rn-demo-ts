import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export interface OverlayFooterProps {
  wrapStyle?: object,
}

export interface OverlayFooterState {
}

export default class OverlayFooter extends React.Component<OverlayFooterProps, OverlayFooterState> {
  constructor(props: OverlayFooterProps) {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },
  withoutContent: {
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 0,
  },
});