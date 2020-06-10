import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface PersonalCenterProps {
}

export interface PersonalCenterState {
}

export default class PersonalCenterComponent extends React.Component<PersonalCenterProps, PersonalCenterState> {
  constructor(props: PersonalCenterProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>PersonalCenter Component</Text>
      </View>
    );
  }
}
