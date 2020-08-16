import * as React from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import StackNavigtor from './StackNavigtor';

export interface NavigatorProps {
}

export default class NavigatorComponent extends React.Component<NavigatorProps, any> {
  constructor(props: NavigatorProps) {
    super(props);
  }

  onStateChange = (state: NavigationState | undefined) => {
    if (state !== undefined) {
      // let activeScreenName = RouteInfo.findRouteNameFromNavigatorState(state);
      // console.log('activeScreenName = ', activeScreenName);
      // if (lightPages.indexOf(activeScreenName) !== -1) {
        // StatusBar.setBarStyle('light-content');
        // Platform.OS === 'android' && StatusBar.setBackgroundColor("transparent");
      // } else {
        StatusBar.setBarStyle('dark-content');
        Platform.OS === 'android' && StatusBar.setBackgroundColor("#fff");
      // }
    }
  }

  public render() {
    return (
      <NavigationContainer
        onStateChange={this.onStateChange}
      >
        <StackNavigtor />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

});
