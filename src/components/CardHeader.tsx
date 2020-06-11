import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface CardHeaderProps {
  headerLeft: string,
  headerLeftStyle?: object,
  headerRight: string,
  headerRightStyle?: object,
}

export interface CardHeaderState {
}

export default class CardHeaderComponent extends React.Component<CardHeaderProps, CardHeaderState> {
  constructor(props: CardHeaderProps) {
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
    const leftStyle = headerLeftStyle ? {...headerLeftStyle, ...styles.leftStyle} : styles.leftStyle;
    const rightStyle = headerRightStyle ? {...headerRightStyle, ...styles.rightStyle} : styles.rightStyle;

    return (
      <View style={styles.wrap}>
        <Text>
          <Text style={leftStyle}>{headerLeft}</Text>
          <Text style={rightStyle}>{headerRight}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 10,
  },
  leftStyle: {
    color: 'red',
  },
  rightStyle: {
    color: 'black',
  },
});
