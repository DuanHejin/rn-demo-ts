import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface CartProps {
}

export interface CartState {
}

export default class CartComponent extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>Cart Component</Text>
      </View>
    );
  }
}
