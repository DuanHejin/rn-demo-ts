
import * as React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Login } from '@/pages/index';
import TabNavigator from './TabNavigator';
import ItemDetailComponent from '../pages/Home/ItemDetail';
import AMap from '@/pages/Map/AMap';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import GPSLocation from '@/pages/Map/GPSLocation';

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
  GPSLocation: {
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
}, {
  name: 'GPSLocation', component: GPSLocation, options: { headerTitle: 'GPS定位' }
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
        screenOptions={{
          headerTitleAlign: "center",
          // ...Platform.select({
          //   android: {
          //     headerStatusBarHeight: StatusBar.currentHeight,
          //   },
          // }),
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth
              }
            })
          }
        }}
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

