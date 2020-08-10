import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapUtils, { Coords, startLoopPosition, stopLoopPosition } from '@/utils/MapUtils';
import { Button } from '@/components/Common/Button';

export interface AMapProps {
}

export interface AMapState {
  coord: Coords;
}

export default class AMap extends React.Component<AMapProps, AMapState> {
  constructor(props: AMapProps) {
    super(props);
    this.state = {
      coord: {} as Coords,
    };
  }

  componentDidMount = () => {
    MapUtils.initAMap();
  };


  getLocation = async () => {
    const coord = await MapUtils.getLocation();
    this.setState({ coord });
  };

  public render() {
    const { coord: { latitude, longitude, address } } = this.state;
    return (
      <View style={styles.wrap}>
        <View style={styles.actionWrap}>
          <Button onPress={this.getLocation}><Text>获取当前坐标</Text></Button>
          <Button onPress={() => {startLoopPosition()}}><Text>开启循环定位</Text></Button>
          <Button onPress={() => {stopLoopPosition()}}><Text>关闭循环定位</Text></Button>
        </View>

        <View style={styles.content}>
          <Text style={styles.txt}>当前坐标</Text>
          <Text style={styles.txt}>经度: {longitude}</Text>
          <Text style={styles.txt}>纬度: {latitude}</Text>
          <Text style={styles.txt}>地址: {address}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  actionWrap: {
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  content: {
    paddingHorizontal: 10,
  },
  txt: {
    paddingVertical: 5,
  },
});
