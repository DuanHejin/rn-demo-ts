import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface FieldGroupProps {
}

export interface FieldGroupState {
}

export default class FieldGroup extends React.Component<FieldGroupProps, FieldGroupState> {
  constructor(props: FieldGroupProps) {
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  }
});
