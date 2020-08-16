import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Classification, Cart, Tools, PersonalCenter } from '@/pages/index';
import { TabNavigationState, RouteProp } from '@react-navigation/native';
import { RootStackParamList, RootStackNavigation } from './StackNavigtor';

export type TabParamList = {
  Home: {},
  Classification: {},
  Cart: {},
  Tools: {},
  PersonalCenter: {},
}

const Tab = createBottomTabNavigator();

type Route = RouteProp<RootStackParamList, "Main"> & {
  state: TabNavigationState
}

interface Screen {
  name: keyof TabParamList;
  component: React.ComponentType<any>,
  options: any;
}

const TabSreens: Screen[] = [{
  name: 'Home', component: Home, options: { tabBarLabel: "Home" }
}, {
  name: 'Classification', component: Classification, options: { tabBarLabel: "Classi" }
}, {
  name: 'Cart', component: Cart, options: { tabBarLabel: "Cart" }
}, {
  name: 'Tools', component: Tools, options: { tabBarLabel: 'Tools' }
}, {
  name: 'PersonalCenter', component: PersonalCenter, options: { tabBarLabel: 'PersonalCenter' }
}];

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
    // console.log('route :>> ', route);
    const { state } = route;
    if (state) {
      const { index, routeNames } = state;
      return routeNames ? routeNames[index] : "Home";
    } else {
      return 'Home'
    }
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
        initialRouteName="Tools"
        tabBarOptions={{
          activeTintColor: '#ff6600',
        }}
      >
        {
          TabSreens.map(({ name, component, options }, index: number) => (
            <Tab.Screen
              key={index}
              name={name}
              options={options}
              component={component}
            />
          ))
        }
      </Tab.Navigator>
    );
  }
}
