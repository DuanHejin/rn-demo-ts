import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends TouchableOpacityProps {
}

export const Touchable: React.SFC<TouchableProps> = (props) => {
  return <TouchableOpacity {...props}></TouchableOpacity>;
};
