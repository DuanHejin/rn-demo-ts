
import * as React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Login } from '@/pages/index';
import TabNavigator from './TabNavigator';
import ItemDetailComponent from '../pages/Home/ItemDetail';
import AMap from '@/pages/Map/AMap';

export type RootStackParamList = {
  Login: {},
  Main: {
    screen?: string,
  },
  ItemDetail: {
    id: string,
  },
  AMap: {
  },
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

interface Screen {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>,
  options: any;
}

const StackSreens: Screen[] = [{
  name: 'Login', component: Login, options: { headerTitle: 'Login' }
}, {
  name: 'Main', component: TabNavigator, options: { headerTitle: '主页' }
}, {
  name: 'ItemDetail', component: ItemDetailComponent, options: { headerTitle: '商品详情' }
}, {
  name: 'AMap', component: AMap, options: { headerTitle: '高德地图' }
}];

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
        initialRouteName='Main'>
        {
          StackSreens.map(({ name, component, options }, index: number) => (
            <Stack.Screen
              key={index}
              name={name}
              options={options}
              component={component}
            />
          ))
        }
      </Stack.Navigator>
    );
  }
}

