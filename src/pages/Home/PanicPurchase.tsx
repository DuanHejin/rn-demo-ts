import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface PanicPurchaseProps {
}

export default class PanicPurchaseComponent extends React.Component<PanicPurchaseProps, any> {
  constructor(props: PanicPurchaseProps) {
    super(props);
  }

  public render() {
    return (
        <View style={styles.wrap}>
          <View style={styles.container}>
            <Text>PanicPurchase Component</Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: "#cccc1f",
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
