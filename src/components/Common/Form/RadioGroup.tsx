import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface RadioGroupProps {
}

export interface RadioGroupState {
}

export default class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const {children} = this.props;
    return (
      <View style={styles.wrap}>
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
    flexWrap: 'wrap',
  },
});
