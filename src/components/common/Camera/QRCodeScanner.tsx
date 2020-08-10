import * as React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import ToastShow from '@/utils/ToastShow';
import Camera from './Camera';
import BarcodeMask from 'react-native-barcode-mask';
import Touchable from '../../Touchable';
import { RootStyles } from '@/styles/RootStyles';
import { BarCodeInputModal } from '@/components/Modals';

export interface QRCodeScannerProps {
  onQRCodeRead?: (data: string) => void;
}

export interface QRCodeScannerState {
  showCamera: boolean;
  showBarCodeInputModal: boolean;
  [key: string]: any;
}

const BarCodeType = Platform.select({
  ios: [
    'org.iso.QRCode', // 二维码
    'org.gs1.EAN-13', // 条形码
  ],
  android: [
    'QR_CODE', // 二维码
    'EAN_13', // 条形码
  ],
})
export default class QRCodeScanner extends React.PureComponent<QRCodeScannerProps, QRCodeScannerState> {
  constructor(props: QRCodeScannerProps) {
    super(props);
    this.state = {
      showCamera: true,
      showBarCodeInputModal: false,
    };
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  showBarCodeInputModal = () => {
    this.setState({
      showBarCodeInputModal: true,
      showCamera: false,
    });
  }

  /**
   * 【通用】关闭modal弹窗
   * @param modalName modal的visible key
   */
  hideModal = (modalName: string) => {
    this.setState({
      [modalName]: false,
      showCamera: true,
    });
  }

  /**
   * 手输箱码的场合
   * @param data 
   */
  handleCodeInput = (data: string) => () => {
    const { onQRCodeRead } = this.props;
    if (typeof onQRCodeRead === 'function') {
      onQRCodeRead(data);
    }
    this.hideModal('showBarCodeInputModal');
  }

  timer: number = 0;
  /**
   * 扫描箱码的场合
   * @param res 
   */
  onBarCodeRead = (res: {
    data: string;
    rawData?: string;
    type: string;
  }) => {
    console.log('res :>> ', res);
    if (BarCodeType?.indexOf(res.type) === -1) {
      if (!this.timer) {
        ToastShow.showDialog('无法识别物料码，请手动输入');
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.timer = 0;
        }, 2000);
      }
      return;
    }

    const { onQRCodeRead } = this.props;
    if (typeof onQRCodeRead === 'function') {
      onQRCodeRead(res.data);
    }
  };

  public render() {
    const { children } = this.props;
    const { showBarCodeInputModal, showCamera } = this.state;
    return (
      <View style={styles.wrap}>
        {
          showCamera && (
            <Camera
              onBarCodeRead={this.onBarCodeRead}
            >
              <BarcodeMask
                showAnimatedLine={true}
                width={'70%'}
                height={'30%'}
                lineAnimationDuration={3000}
              ></BarcodeMask>
              <View style={styles.actionWrap}>
                {children}
                <Touchable style={[RootStyles.defaultBtnWrap, styles.btnInputCode]} onPress={this.showBarCodeInputModal}>
                  <Text style={RootStyles.defaultBtnTxt}>手动输入</Text>
                </Touchable>
              </View>
            </Camera>
          )
        }
        {
          showBarCodeInputModal && (
            <BarCodeInputModal
              onCancel={this.hideModal.bind(this, 'showBarCodeInputModal')}
              onConfirm={this.handleCodeInput}
            ></BarCodeInputModal>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginTop: '-20%',
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  actionWrap: {
    ...StyleSheet.absoluteFillObject,
    top: '70%',
    alignItems: 'center',
  },
  btnInputCode: {
    marginTop: 30,
    width: '70%',
  }
});
