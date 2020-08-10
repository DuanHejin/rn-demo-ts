import { Platform, PermissionsAndroid } from "react-native";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import {
  init, Geolocation, Coordinates, setLocatingWithReGeocode,
  setPausesLocationUpdatesAutomatically,
  setAllowsBackgroundLocationUpdates,
  addLocationListener,
  start,
  stop,
  Location,
  ReGeocode,
  Position,
  _options,
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

  if (Platform.OS === 'android') {
    // 对于 Android 需要自行根据需要申请权限
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
  }

  await init({
    ios: "0ca31a9afa477d4a62dbb065ca7d6a01",
    android: "043b24fe18785f33c491705ffe5b6935" // FIXUP
  });
  if (Platform.OS === 'ios') {
    // 设置逆地理位置编码
    setLocatingWithReGeocode(true);
  }
}

const showLocationErrDialog = () => {
  ToastShow.showDialog('获取位置信息失败，请检查手机定位')
};


/**
 * 获取当前经纬度
 */
const getLocation = async (): Promise<Coords> => {
  return new Promise(async (resolve, reject) => {
    // 检查是否有权限
    const isGranted = await isPermissionGranted();
    if (!isGranted) {
      showLocationErrDialog();
      return;
    }

    if (Platform.OS === 'android') {

    } else if (Platform.OS === 'ios') {
      // Geolocation.getCurrentPosition((position) => {
      //   // console.log('position :>> ', JSON.stringify(position, undefined, 2));
      //   const { location, coords }: { location: any, coords: Coordinates } = position;
      //   const { latitude, longitude } = coords;
      //   const address = location.address;
      //   const res = { latitude, longitude, address };

      //   console.log('当前坐标和街道地址 :>> ', res);
      //   resolve(res);
      // }, (err) => {
      //   console.log(err);
      //   showLocationErrDialog();
      // });



      var listener = addLocationListener(function (location) {
        if (location.errorCode) {
          stop();
          return listener.remove();
        }

        if (_options.locatingWithReGeocode && typeof location.address !== "string") {
          return;
        }

        console.log('location :>> ', location);
        const { latitude, longitude } = location;
        const address = location.address;
        const res = { latitude, longitude, address };
        console.log('当前坐标和街道地址 :>> ', res);
        resolve(res);
        stop();
        return listener.remove();
      });
      start();
    }
  });
};

let intervalId = 0;
let watchMap: any[] = [];
let watchId = 0;
/**
 * 开始循环定位
 * @param callback 
 * @param intervalTime 
 */
export const startLoopPosition = async (callback?: (res: Coords) => void, intervalTime?: number) => {
  // 检查是否有权限
  const isGranted = await isPermissionGranted();
  if (!isGranted) {
    showLocationErrDialog();
    return;
  }

  if (Platform.OS === 'android') {

  } else if (Platform.OS === 'ios') {
    console.log('开始循环定位 -------  ')
    try {

      // 设置不允许系统自动暂停定位
      setPausesLocationUpdatesAutomatically(false);
      // 设置允许后台定位
      setAllowsBackgroundLocationUpdates(true);
      let count = 0;

      // intervalId = setInterval(() => {
      //   Geolocation.getCurrentPosition((position) => {
      //     // console.log('position :>> ', JSON.stringify(position, undefined, 2));
      //     const { location, coords }: { location: any, coords: Coordinates } = position;
      //     const { latitude, longitude } = coords;
      //     const address = location.address;
      //     const res = { latitude, longitude, address };

      //     console.log('当前坐标和街道地址 :>> ', res);
      //     if (typeof callback === 'function') {
      //       callback(res);
      //     }
      //   }, (err) => {
      //     console.log(err);
      //     showLocationErrDialog();
      //   });
      // }, intervalTime || 3000);

      // const positionList: Coords[] = [];
      // intervalId = setInterval(() => {
      //   if (positionList.length > 0) {
      //     console.log('positionList size',
      //       positionList.length,
      //       'latest item in positionList',
      //       positionList[positionList.length - 1])
      //   }
      // }, intervalTime || 3000);

      // const successCallback = (location: Location & ReGeocode) => {
      //   if (location.errorCode) {
      //     console.log(location.errorInfo);
      //   } else {
      //     console.log('循环拿数据', ++count)
      //     const coords = {
      //       latitude: location.latitude,
      //       longitude: location.longitude,
      //       address: location.address,
      //     }
      //     positionList.push(coords);
      //   }
      // }

      // watchMap[++watchId] = addLocationListener(successCallback);
      // start();
      // return watchId;

      const timer = intervalTime || 3000;

      intervalId = setInterval(() => {
        if (positionList.length > 0) {
          console.log('positionList size',
            positionList.length,
            'latest item in positionList',
            positionList[positionList.length - 1])
        }
      }, timer);

      const positionList: Coords[] = [];
      const successCallback = ({ location }: Position) => {
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
  // stop();

  // var listener = watchMap[watchId];
  // if (listener) {
  //   listener.remove();
  // }

  stop();
  Geolocation.clearWatch(watchId);


  if (intervalId) {
    clearInterval(intervalId);
  }
  if (Platform.OS === 'ios') {
    // 设置允许系统自动暂停定位
    setPausesLocationUpdatesAutomatically(true);
    // 设置不允许后台定位
    setAllowsBackgroundLocationUpdates(false);
  }
};


const MapUtils = {
  initAMap,
  getLocation,
  startLoopPosition,
  stopLoopPosition,
}

export default MapUtils;

