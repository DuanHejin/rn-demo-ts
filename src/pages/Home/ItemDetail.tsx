import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackNavigation, RootStackParamList } from '@/navigator/StackNavigtor';

export interface ItemDetailProps {
  navigation: RootStackNavigation,
  route: RouteProp<RootStackParamList, 'ItemDetail'>
}

export interface ItemDetailState {
}

export default class ItemDetailComponent extends React.Component<ItemDetailProps, ItemDetailState> {
  constructor(props: ItemDetailProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const { route: { params: { id } } } = this.props;
    return (
      <View>
        <Text>ItemDetail Component</Text>
        <Text>id is {id}</Text>
      </View>
    );
  }
}
