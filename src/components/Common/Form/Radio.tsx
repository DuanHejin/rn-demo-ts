import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Touchable from '@/components/Touchable';

export interface RadioProps {
  label: string,
  value: number,
  checked: boolean,
  onCheck: (value: number) => () =>  void;
  wrapStyle?: object,
  valueWrapStyle?: object,
  valueTxtStyle?: object,
}

const RadioColor = {
  CHECKED: '#999',
  NOT_CHECKED: '#fff',
}

export default class Radio extends React.Component<RadioProps, any> {
  constructor(props: RadioProps) {
    super(props);
  }

  public render() {
    const { label, value, checked, onCheck, wrapStyle } = this.props;
    const radioStyle = {
      backgroundColor: checked ? RadioColor.CHECKED : RadioColor.NOT_CHECKED,
    }
    return (
      <Touchable onPress={onCheck(value)} style={[styles.wrap, wrapStyle]}>
        <View style={[styles.radio, radioStyle]}></View>
        <Text style={styles.labelTxt}>{label}</Text>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 5,
    minWidth: '50%',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: '#d9d9d9',
    borderWidth: 1,
  },
  labelTxt: {
    fontSize: 14,
    color: "#999",
    marginLeft: 5,
  },
});
