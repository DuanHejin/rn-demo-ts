import * as React from 'react';
import { View, StyleSheet, Text, DeviceEventEmitter, NativeModules } from 'react-native';
import MapUtils, { Coords, startLoopPosition, stopLoopPosition } from '@/utils/MapUtils';
import { Button } from '@/components/Common/Button';
import { cancelBGLocation } from '@/utils/BackgroundLocation';

const RNALocation = NativeModules.RNALocation;

export interface GPSLocationProps {
}

export interface GPSLocationState {
  coord: Coords;
}

export default class GPSLocation extends React.Component<GPSLocationProps, GPSLocationState> {
  constructor(props: GPSLocationProps) {
    super(props);
    this.state = {
      coord: {} as Coords,
    };
  }

  EVENT_NAME_GPS_LOCATION_UPDATE = 'updateLocation';
  LISTENER__GPS_LOCATION_UPDATE = (e: any) => {
    console.log('from frontend ->', e);
    const coord: Coords = {
      latitude: e.Latitude,
      longitude: e.Longitude,
    };
    this.setState({coord});
  };

  componentDidMount = () => {
  };

  componentWillUnmount = () => {
    this.removeListener();
  };

  removeListener = () => {
    console.log('---- 移除前台监听');
    DeviceEventEmitter.removeListener(this.EVENT_NAME_GPS_LOCATION_UPDATE, this.LISTENER__GPS_LOCATION_UPDATE);
  };

  removeBGListener = () => {
    console.log('---- 移除后台监听');
    cancelBGLocation();
  };


  // getLocation = (needRegeo = false) => async () => {
  //   const coord = await MapUtils.getLocationOnce(needRegeo);
  //   this.setState({ coord });
  // };

  watchLocation = () => () => {
    DeviceEventEmitter.addListener(this.EVENT_NAME_GPS_LOCATION_UPDATE, this.LISTENER__GPS_LOCATION_UPDATE);
    RNALocation.LocationListener()
  };

  public render() {
    const { coord: { latitude, longitude, address } } = this.state;
    return (
      <View style={styles.wrap}>
        <View style={styles.actionWrap}>
          <Button onPress={this.watchLocation()}><Text>注册监听</Text></Button>
          <Button onPress={this.removeListener}><Text>移除前台监听</Text></Button>
          <Button onPress={this.removeBGListener}><Text>移除后台监听</Text></Button>
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
