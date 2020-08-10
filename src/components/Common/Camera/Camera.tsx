import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Touchable from '@/components/Touchable';
import { throttle } from 'lodash';
import SarsIcoUp from '@/assets/iconfont/SarsIcoUp';

export interface CameraProps {
  onDismiss?: () => void;
  onBarCodeRead?: (param: {
    data: string;
    rawData?: string;
    type: string;
  }) => void;
}

export interface CameraState {
}

let isRead: boolean = false;
let timer: number = 0;

export default class Camera extends React.PureComponent<CameraProps, CameraState> {
  constructor(props: CameraProps) {
    super(props);
    this.state = {
    };
  }
  camera: RNCamera | null = null;

  componentWillUnmount() {
    if (timer) {
      clearTimeout(timer);
      isRead = false;
    }
  }

  /**
   * 扫码节流, 设置1000ms一次
   * @param e 
   */
  handleBarCodeRead = (e: any) => {
    const { onBarCodeRead } = this.props;
    if (!isRead) {
      if (typeof onBarCodeRead === 'function') {
        isRead = true;
        clearTimeout(timer);

        onBarCodeRead(e);

        timer = setTimeout(() => {
          isRead = false;
        }, 1000);
      }
    }
  }

  public render() {
    const { onDismiss, onBarCodeRead, children } = this.props;

    return (
      <View style={styles.container} >
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          onBarCodeRead={this.handleBarCodeRead}
          captureAudio={false}
        >
          {children}
        </RNCamera>
        {/* <View style={styles.btnBackWrap}>
          <Touchable onPress={onDismiss} style={styles.btnBack}>
            <SarsIcoUp style={styles.btnBackIcon} size={24} color="#000"></SarsIcoUp>
          </Touchable>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnBackWrap: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  btnBack: {
    backgroundColor: '#fff',
    margin: 20,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBackIcon: {
    transform: [{ rotate: '-90deg' }],
    fontWeight: 'bold',
    marginLeft: -3,
  },
});
