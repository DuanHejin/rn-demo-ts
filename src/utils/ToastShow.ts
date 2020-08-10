import Toast from 'react-native-root-toast';

export default class ToastShow {
    static toastType = null;

    static showDialog(msg: string, durations: number = 2000) {
        console.log('msg = ', msg);
        if(typeof msg != 'string'){
            console.log('msg err = ', msg);
            return;
        }
        if (ToastShow.toastType) {
            Toast.hide(ToastShow.toastType);
        }

        ToastShow.toastType = Toast.show(msg, {
            duration: durations,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: false,
            delay: 0,
            textStyle:{
                fontSize:18
            }
        });
    }
}