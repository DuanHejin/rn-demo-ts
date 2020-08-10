import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, GestureResponderEvent } from 'react-native';


let isClicked: boolean = false;
let timer: number = 0;


export interface TouchableProps extends TouchableOpacityProps {
  isBtn?: boolean;
  btnWrap?: any;
}

export const Touchable: React.SFC<TouchableProps> = (props) => {
  const { style, isBtn, btnWrap, onPress, ...rest } = props;

  const handlePress = (e: GestureResponderEvent) => {
    if (!isClicked) {
      if (typeof onPress === 'function') {
        isClicked = true;
        clearTimeout(timer);

        onPress(e);

        timer = setTimeout(() => {
          isClicked = false;
        }, 500);
      }
    }
  }

  return (
    <TouchableOpacity
      style={[style, isBtn && btnWrap]}
      onPress={handlePress}
      activeOpacity={0.8}
      {...rest}
    >
    </TouchableOpacity>);
};
