import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ImageObjComponent from './ImageObj';

export interface CarouselProps {
}

export interface CarouselState {
}

export default class CarouselComponent extends React.Component<CarouselProps, CarouselState> {
  constructor(props: CarouselProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
        <ImageObjComponent></ImageObjComponent>
      </View>
    );
  }
}
