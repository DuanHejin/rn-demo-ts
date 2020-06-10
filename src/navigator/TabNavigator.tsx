import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Classification, Cart, PersonalCenter } from '@/pages/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabNavigationState } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export type Route = {
  name: string,
  state: TabNavigationState
};

export interface TabNavigatorProps {
  navigation: StackNavigationProp<any>,
  route: Route
}

export interface TabNavigatorState {
}

export default class TabNavigatorComponent extends React.Component<TabNavigatorProps, TabNavigatorState> {
  constructor(props: TabNavigatorProps) {
    super(props);
    this.state = {
    };
  }

  getHeaderTitle = (route: Route) => {
    const { state: { index, routeNames } } = route;
    return routeNames ? routeNames[index] : "Home";
  }

  componentDidUpdate = () => {
    const { navigation, route } = this.props;
    navigation.setOptions({
      headerTitle: this.getHeaderTitle(route),
    });
  };


  public render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#ff6600',
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home"
          }}
        />
        <Tab.Screen
          name="Classification"
          component={Classification}
          options={{
            tabBarLabel: "Classi"
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Cart"
          }}
        />
        <Tab.Screen
          name="PersonalCenter"
          component={PersonalCenter}
          options={{
            tabBarLabel: "PersonalCenter"
          }}
        />
      </Tab.Navigator>
    );
  }
}
