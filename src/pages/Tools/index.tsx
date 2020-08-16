import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Touchable } from '@/components/Common/Touchable';
import { RootStackParamList, RootStackNavigation } from '@/navigator/StackNavigtor';

interface Entry {
  path: keyof RootStackParamList;
  label: string;
  icon?: any;
}

export interface ToolsProps {
  navigation: RootStackNavigation;
}

export interface ToolsState {
}

export default class Tools extends React.Component<ToolsProps, ToolsState> {
  constructor(props: ToolsProps) {
    super(props);
    this.state = {
    };
  }

  entries: Entry[] = [{
    path: 'AMap',
    label: '高德地图Demo',
  }, {
    path: 'GPSLocation',
    label: 'GSP 定位Demo',
  }];

  /**
   * 跳转到指定页面
   * @param path 页面path
   */
  jumpToPath = (path: keyof RootStackParamList) => () => {
    const { navigation } = this.props;
    navigation.navigate(path, {});
  };

  public render() {
    return (
      <View style={styles.wrap}>
        {
          this.entries.map(({ path, label }, index: number) => (
            <Touchable style={styles.btnWrap} onPress={this.jumpToPath(path)} key={index}>
              <Text>{index + 1}. {label}</Text>
            </Touchable>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
  },
  btnWrap: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
});
