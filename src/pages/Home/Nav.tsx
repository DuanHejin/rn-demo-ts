import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export interface NavProps {
}

export interface NavState {
}

export default class NavComponent extends React.Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.container}>
          <Text>Nav Component</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: "#cccccc",
    borderRadius: 5,
    margin: 10,
    marginTop: 0,
  },
  container: {
    flex: 1,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
