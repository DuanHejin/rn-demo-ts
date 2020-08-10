import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacityProps } from 'react-native';
import { Touchable } from '@/components/Common/Touchable';


type BtnType = {
  default: undefined;
  confirm: undefined;
  warning: undefined;
}

export interface ButtonProps extends TouchableOpacityProps {
  type?: keyof BtnType;
}

export default class Button extends React.Component<ButtonProps, any> {
  constructor(props: ButtonProps) {
    super(props);
  }

  getBtnWrapStyle = (type?: keyof BtnType) => {
    let result = undefined;
    switch (type) {
      case 'confirm':
        result = styles.btnConfirmWrap;
        break;
      case 'warning':
        result = styles.btnWarningWrap;
        break;

      default:
        result = styles.defaultBtnWrap;
        break;
    }
    return result;
  };


  public render() {
    const { type, ...rest } = this.props;
    const btnWrap = this.getBtnWrapStyle(type);

    return (
      <Touchable isBtn={true} btnWrap={btnWrap} {...rest}></Touchable>
    );
  }
}

const btnBaseStyles = StyleSheet.create({
  btnWrap: {
    marginLeft: 10,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    minWidth: 80,
    borderRadius: 20,
  },
});

const styles = StyleSheet.create({
  defaultBtnWrap: {
    ...btnBaseStyles.btnWrap,
  },
  btnConfirmWrap: {
    ...btnBaseStyles.btnWrap,
    backgroundColor: '#F8DA16',
  },
  btnWarningWrap: {
    ...btnBaseStyles.btnWrap,
    backgroundColor: '#FF6630',
  },
});
