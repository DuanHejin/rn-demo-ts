import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface ImageObjProps {
}

export interface ImageObjState {
}

export default class ImageObjComponent extends React.Component<ImageObjProps, ImageObjState> {
  constructor(props: ImageObjProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>ImageObj Component</Text>
      </View>
    );
  }
}
