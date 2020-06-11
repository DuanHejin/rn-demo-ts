import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Classification, Cart, PersonalCenter } from '@/pages/index';
import { TabNavigationState, RouteProp } from '@react-navigation/native';
import { RootStackParamList, RootStackNavigation } from './StackNavigtor';

const Tab = createBottomTabNavigator();

type Route = RouteProp<RootStackParamList, "Main"> & {
  state: TabNavigationState
}

export interface TabNavigatorProps {
  navigation: RootStackNavigation,
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
