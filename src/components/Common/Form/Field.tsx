import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface FieldProps {
  label?: string,
  value: string | number,
  icon?: React.ReactNode;
  suffixIcon?: boolean;
  wrapStyle?: object,
  valueWrapStyle?: object,
  valueTxtStyle?: object,
}

export default class Field extends React.Component<FieldProps, any> {
  constructor(props: FieldProps) {
    super(props);
  }

  renderLabel = () => {
    const { label, icon, suffixIcon } = this.props;
    return (
      <View style={styles.labelWrap}>
        {
          !suffixIcon && icon && (
            <View style={styles.iconWrap}>
              {icon}
            </View>)
        }
        {
          label && (<Text style={styles.labelTxt}>{label}: </Text>)
        }
      </View>
    );
  };

  renderValue = () => {
    const { value, icon, suffixIcon, valueWrapStyle, valueTxtStyle } = this.props;
    if (value) {
      return (
        <View style={[styles.valueWrap, valueWrapStyle]}>
          <Text style={[styles.valueTxt, valueTxtStyle]}>{value}</Text>
          {
            suffixIcon && icon && (
              <View style={[styles.iconWrap, styles.iconWrapSuffix]}>
                {icon}
              </View>)
          }
        </View>
      );
    }
    return;
  };




  public render() {
    const { value, wrapStyle } = this.props;
    return (
      <View style={[styles.wrap, wrapStyle]}>
        {
          this.renderLabel()
        }
        {
          this.renderValue()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
  },
  labelWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 14,
    color: "#999",
  },
  iconWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  iconWrapSuffix: {
    marginRight: 0,
    marginLeft: 10,
  },
  valueWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  valueTxt: {
    fontSize: 14,
    color: "#999",
  },
});
