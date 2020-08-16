import { Platform, PermissionsAndroid } from "react-native";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import {
  init, Geolocation, Coordinates, setLocatingWithReGeocode,
  setPausesLocationUpdatesAutomatically,
  setAllowsBackgroundLocationUpdates,
  stop,
  Location,
  // getLocationOnce,
  setDesiredAccuracy,
  setInterval as setIntervalOnAndroid,
} from "react-native-amap-geolocation";
import ToastShow from '@/utils/ToastShow';
import _ from 'lodash';

/** 坐标信息 */
export interface Coords {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
  /** 经度 */
  address?: string;
}

export interface AMapLocation extends Location {
  address: string;
}

/**
 * 查看是否开启定位权限
 */
const isPermissionGranted = async () => {
  if (Platform.OS === 'android') {
    const res = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ]);
    console.log('android permission res :>> ', res);
    if (res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !== 'granted' ||
      res[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] !== 'granted') {
      return false;
    }
    return true;
  } else {
    const res = await requestMultiple([
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ]);
    console.log('ios permission res :>> ', res);
    if (res[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'granted' ||
      res[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] == 'granted') {
      return true;
    }
    return false;
  }
};

const initAMap = async () => {

  await init({
    ios: "0ca31a9afa477d4a62dbb065ca7d6a01",
    android: "0e769d340143c98fb30c1bd697cfd5de",
  });
  if (Platform.OS === 'ios') {
    // 设置IOS精度
    setDesiredAccuracy(100);
  }
}

const showLocationErrDialog = () => {
  ToastShow.showDialog('获取位置信息失败，请检查手机定位')
};


/**
 * 获取当前经纬度
 */
const getLocation = async (needRegeo: boolean = false): Promise<Coords> => {
  return new Promise(async (resolve, reject) => {
    // 检查是否有权限
    const isGranted = await isPermissionGranted();
    if (!isGranted) {
      showLocationErrDialog();
      return;
    }

    if (Platform.OS === 'android') {

      const callback = ({ location }: any) => {
        const { latitude, longitude } = location;
        const address = location.address;
        const res = { latitude, longitude, address };

        console.log('------------- 当前坐标和街道地址 :>> ', res);
        resolve(res);
      }

      Geolocation.getCurrentPosition(callback);

    } else if (Platform.OS === 'ios') {

      const callback = (location: any) => {
        const { latitude, longitude } = location;
        const address = location.address;
        const res = { latitude, longitude, address };

        console.log('------------- 当前坐标和街道地址 :>> ', res);
        resolve(res);
      }

      // getLocationOnce({ regeo: needRegeo }).then(callback);
    }
  });
};

let intervalId = 0;
let watchId = 0;
/**
 * 开始循环定位
 * @param callback 
 * @param intervalTime 
 */
export const startLoopPosition = async (needRegeo: boolean = true, callback?: (res: Coords) => void, intervalTime?: number) => {
  // 检查是否有权限
  const isGranted = await isPermissionGranted();
  if (!isGranted) {
    showLocationErrDialog();
    return;
  }

  if (Platform.OS === 'android') {
    console.log('android开始循环定位 -------  ')
    try {

      const timer = intervalTime || 30000;
      setIntervalOnAndroid(timer);

      intervalId = setInterval(() => {
        if (positionList.length > 0) {
          const latestCoords = positionList[positionList.length - 1];
          console.log('------------- positionList size', positionList.length, 'latest item in positionList', latestCoords);

          if (typeof callback === 'function') {
            callback(latestCoords);
          }
        }
      }, timer);

      const positionList: Coords[] = [];
      const successCallback = ({ location }: any) => {
        const coords = {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
        }
        positionList.push(coords);
      }

      watchId = Geolocation.watchPosition(_.throttle(successCallback, timer, { leading: true, trailing: false }));
    } catch (error) {
      console.log('循环定位失败 ------- error :>> ', error);
    }

  } else if (Platform.OS === 'ios') {
    console.log('ios开始循环定位 -------  ')
    try {

      setLocatingWithReGeocode(needRegeo);
      // 设置不允许系统自动暂停定位
      setPausesLocationUpdatesAutomatically(false);
      // 设置允许后台定位
      setAllowsBackgroundLocationUpdates(true);

      const timer = intervalTime || 30000;
      intervalId = setInterval(() => {
        if (positionList.length > 0) {
          const latestCoords = positionList[positionList.length - 1];
          console.log('------------- positionList size', positionList.length, 'latest item in positionList', latestCoords);

          if (typeof callback === 'function') {
            callback(latestCoords);
          }
        }
      }, timer);

      const positionList: Coords[] = [];
      const successCallback = ({ location }: any) => {
        const coords = {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address,
        }
        positionList.push(coords);
      }

      watchId = Geolocation.watchPosition(_.throttle(successCallback, timer, { leading: true, trailing: false }));
    } catch (error) {
      console.log('循环定位失败 ------- error :>> ', error);
    }
  }
};

/**
 * 停止循环定位
 */
export const stopLoopPosition = () => {
  console.log('关闭循环定位 -------  ')

  Geolocation.clearWatch(watchId);

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = 0;
  }

  if (Platform.OS === 'ios') {
    setLocatingWithReGeocode(false);
    // 设置允许系统自动暂停定位
    setPausesLocationUpdatesAutomatically(true);
    // 设置不允许后台定位
    setAllowsBackgroundLocationUpdates(false);
  }
};


const MapUtils = {
  initAMap,
  getLocationOnce: getLocation,
  startLoopPosition,
  stopLoopPosition,
}

export default MapUtils;

