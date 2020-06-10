
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from "@/pages/index";
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator()

export interface StackNavigatoyProps {
}

export interface StackNavigatoyState {
}

export default class StackNavigatoyComponent extends React.Component<StackNavigatoyProps, StackNavigatoyState> {
  constructor(props: StackNavigatoyProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Stack.Navigator
        initialRouteName="Main">
        <Stack.Screen
          name="Login"
          options={{
            headerTitle: "Login"
          }}
          component={Login}
        />
        <Stack.Screen
          name="Main"
          options={{
            headerTitle: "主页"
          }}
          component={TabNavigator}
        />
      </Stack.Navigator>
    );
  }
}

