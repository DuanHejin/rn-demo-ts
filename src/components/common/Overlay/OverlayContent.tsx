import * as React from 'react';
import { View, StyleSheet } from 'react-native';

export interface OverlayContentProps {
  wrapStyle?: object,
}

export interface OverlayContentState {
}

export default class OverlayContent extends React.Component<OverlayContentProps, OverlayContentState> {
  constructor(props: OverlayContentProps) {
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
    backgroundColor: '#F9F9F9',
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderRadius: 10,
  }
});
