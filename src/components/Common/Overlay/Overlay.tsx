import * as React from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export interface OverlayProps {
  visible: boolean;
  onDismiss?: () => void;
  size?: 'lg' | 'md' | 'sm';
}

export interface OverlayState {
}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {
  constructor(props: OverlayProps) {
    super(props);
    this.state = {
    };
  }

  getContainerSize = () => {
    const { size } = this.props;
    switch (size) {
      case 'lg':
        return styles.sizeLg;
      case 'md':
        return styles.sizeMd;
      case 'sm':
        return styles.sizeSm;
      default:
        return styles.sizeLg;
    }
  }

  render() {
    const { visible, children, onDismiss } = this.props;
    const containerSize = this.getContainerSize();
    return (
      <Modal visible={visible} animationType="fade" transparent={true} onDismiss={onDismiss}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.wrap}
          resetScrollToCoords={{ x: 0, y: 0 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps='handled'>
          <View style={[styles.container, containerSize]}>
            {children}
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }

}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  sizeLg: {
    width: '80%',
  },
  sizeMd: {
    width: '70%',
  },
  sizeSm: {
    width: '60%',
  },
});
