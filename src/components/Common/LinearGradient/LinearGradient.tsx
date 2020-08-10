import * as React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLinearGradient from 'react-native-linear-animated-gradient-transition';

interface LinearGradientProps {
  colors?: Array<string>;
  style?: any;
}

class LinearGradient extends React.Component<LinearGradientProps, any> {
  constructor(props: LinearGradientProps) {
    super(props);
  }
  baseColors: Array<string> = ['#FF6630', '#FF3535'];

  public render() {
    const { colors, style, children } = this.props;
    const myColors = Array.isArray(colors) ? colors : this.baseColors;
    const myStyle = style ? style : styles.container;
    
    return (
      <AnimatedLinearGradient
        colors={myColors}
        style={myStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        {children}
      </AnimatedLinearGradient>
    );
  }
}

export default LinearGradient;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
});