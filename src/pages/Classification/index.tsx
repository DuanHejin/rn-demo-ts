import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface ClassificationProps {
}

export interface ClassificationState {
}

export default class ClassificationComponent extends React.Component<ClassificationProps, ClassificationState> {
  constructor(props: ClassificationProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>Classification Component</Text>
      </View>
    );
  }
}
