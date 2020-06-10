import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigtor from './StackNavigtor';

export interface NavigatorProps {
}

export default class NavigatorComponent extends React.Component<NavigatorProps, any> {
  constructor(props: NavigatorProps) {
    super(props);
  }

  public render() {
    return (
      <NavigationContainer>
        <StackNavigtor />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});
