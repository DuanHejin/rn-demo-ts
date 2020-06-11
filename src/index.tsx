import React from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Text } from 'react-native';
import { Header, ReloadInstructions, DebugInstructions, LearnMoreLinks, Colors } from 'react-native/Libraries/NewAppScreen';
import NavigatorComponent from './navigator';
import { Home } from './pages';
import { getWidth } from '@/utils/index';

export interface IProps {
}

export default class extends React.Component<IProps> {
  public render() {
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.body}>
          <StatusBar barStyle="dark-content" />
          <NavigatorComponent />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
