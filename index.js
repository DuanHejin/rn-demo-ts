/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { addBGLocationListener, cancelBGLocation } from './src/utils/BackgroundLocation';


AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('BackgroundLocationTask', addBGLocationListener);
AppRegistry.registerCancellableHeadlessTask('BackgroundLocationTask', addBGLocationListener, cancelBGLocation);
