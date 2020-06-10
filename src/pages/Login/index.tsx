import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface LoginProps {
}

export interface LoginState {
}

export default class LoginComponent extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>Login Component</Text>
      </View>
    );
  }
}
