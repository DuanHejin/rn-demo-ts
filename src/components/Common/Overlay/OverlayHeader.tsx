import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface OverlayHeaderProps {
  headerLeft: string,
  headerLeftStyle?: object,
  headerRight?: string | number,
  headerRightStyle?: object,
}

export interface OverlayHeaderState {
}

export default class OverlayHeader extends React.Component<OverlayHeaderProps, OverlayHeaderState> {
  constructor(props: OverlayHeaderProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const {
      headerLeft,
      headerLeftStyle,
      headerRight,
      headerRightStyle
    } = this.props;

    return (
      <View style={styles.wrap}>
        <View style={styles.headerLeftWrap}>
          <Text style={[styles.headerLeftTxt, headerLeftStyle]}>{headerLeft}</Text>
        </View>
        <View style={styles.headerRightWrap}>
          <Text style={[styles.headerRightTxt, headerRightStyle]}>{headerRight}</Text>
        </View>
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
    paddingBottom: 10,
    borderBottomColor: '#E2E4E8',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerLeftWrap: {

  },
  headerLeftTxt: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  headerRightWrap: {

  },
  headerRightTxt: {
    fontSize: 15,

  },
});
