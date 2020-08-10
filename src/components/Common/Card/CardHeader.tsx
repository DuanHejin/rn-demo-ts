import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Image from '@/components/Image';

export interface CardHeaderProps {
  headerWrapStyle?: object,
  headerLeft: string,
  headerLeftIcon?: React.ReactNode,
  headerLeftStyle?: object,
  headerRight?: string | number,
  headerRightStyle?: object,
}

export interface CardHeaderState {
}

export default class CardHeader extends React.Component<CardHeaderProps, CardHeaderState> {
  constructor(props: CardHeaderProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const {
      headerWrapStyle,
      headerLeft,
      headerLeftIcon,
      headerLeftStyle,
      headerRight,
      headerRightStyle
    } = this.props;

    return (
      <View style={[styles.wrap, headerWrapStyle]}>
        <View style={styles.headerLeftWrap}>
          {
            headerLeftIcon
          }
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
