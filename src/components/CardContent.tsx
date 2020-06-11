import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CarouselComponent from './Carousel';

export interface CardContentProps {
}

export interface CardContentState {
}

export default class CardContentComponent extends React.Component<CardContentProps, CardContentState> {
  constructor(props: CardContentProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
        <CarouselComponent></CarouselComponent>
        <Text>CardContent Component</Text>
      </View>
    );
  }
}
