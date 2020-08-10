import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface DividerProps {
  customStyle?: object;
  simple?: boolean;
}

const Divider: React.SFC<DividerProps> = ({ customStyle, simple }) => {
  return (
    <View style={[styles.divider, customStyle, simple && styles.noMargin]}></View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E4E8',
    marginTop: 15,
  },
  noMargin: {
    marginTop: 0,
  }
});