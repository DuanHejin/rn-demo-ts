import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapUtils from '@/utils/MapUtils';
import { Coordinates } from "react-native-amap-geolocation";
import { Touchable } from '@/components/common/Touchable';

export interface AMapProps {
}

export interface AMapState {
  coord: Coordinates;
}

export default class AMap extends React.Component<AMapProps, AMapState> {
  constructor(props: AMapProps) {
    super(props);
    this.state = {
      coord: {} as Coordinates,
    };
  }

  componentDidMount = () => {
    MapUtils.initAMap();
  };
  

  getLocation = async () => {
    const coord = await MapUtils.getLocation();
    this.setState({ coord })
  };

  public render() {
    const { coord: { latitude, longitude } } = this.state;
    return (
      <View style={styles.wrap}>
        <View style={styles.actionWrap}>
          <Touchable onPress={this.getLocation}><Text>获取当前坐标</Text></Touchable>
        </View>

        <Text>当前坐标:</Text>
        <Text>经度: {longitude}</Text>
        <Text>纬度: {latitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  actionWrap: {
    paddingVertical: 10,
  },
});
