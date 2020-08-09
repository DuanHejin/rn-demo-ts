import { Platform, PermissionsAndroid } from "react-native";
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { init, Geolocation, Coordinates, setLocatingWithReGeocode } from "react-native-amap-geolocation";

/** 坐标信息 */
export interface Coords {
  /** 纬度 */
  latitude: number;
  /** 经度 */
  longitude: number;
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

  setLocatingWithReGeocode(true);
}


/**
 * 获取当前经纬度
 */
const getLocation = async (): Promise<Coordinates> => {
  return new Promise(async (resolve, reject) => {
    const isGranted = await isPermissionGranted();
    if (!isGranted) {
      reject();
      return;
    }

    if (Platform.OS === 'android') {

      // } else if (Platform.OS === 'ios') {
      //   Geolocation.getCurrentPosition(({ coords }) => {
      //     console.log(coords);
      //     resolve(coords);
    } else if (Platform.OS === 'ios') {
      Geolocation.getCurrentPosition((position) => {
        console.log('position :>> ', JSON.stringify(position, undefined, 2));
        const { coords } = position;
        // console.log(coords);
        resolve(coords);
      }, (err) => {
        console.log(err);
        reject();
      });
    }
  });
};

const MapUtils = {
  initAMap,
  getLocation,
}

export default MapUtils;

