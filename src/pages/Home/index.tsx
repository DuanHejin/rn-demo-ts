import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import HeaderComponent from './Header';
import NavComponent from './Nav';
import PanicPurchaseComponent from './PanicPurchase';
import BoomTodayComponent from './BoomToday';
import { RootStackNavigation } from '@/navigator/StackNavigtor';

export interface HomeProps {
  navigation: RootStackNavigation
}

export interface HomeState {
}

export default class HomeComponent extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <HeaderComponent></HeaderComponent>
          <NavComponent></NavComponent>
          <PanicPurchaseComponent></PanicPurchaseComponent>
          <BoomTodayComponent navigation={navigation}></BoomTodayComponent>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});