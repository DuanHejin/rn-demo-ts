
import * as React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Login } from "@/pages/index";
import TabNavigator from './TabNavigator';
import ItemDetailComponent from '../pages/Home/ItemDetail';

export type RootStackParamList = {
  Login: {},
  Main: {
      screen?: string,
  },
  ItemDetail: {
      id: string,
  },
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

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
        <Stack.Screen
          name="ItemDetail"
          options={{
            headerTitle: "商品详情"
          }}
          component={ItemDetailComponent}
        />
      </Stack.Navigator>
    );
  }
}

