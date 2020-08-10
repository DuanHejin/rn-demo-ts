import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '@/components/Touchable';
import Image from '@/components/Image';
import SarsIcoDown from '@/assets/iconfont/SarsIcoDown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { RootStyles } from '@/styles/RootStyles';

const DatePickerFormat = 'YYYY-MM-DD';

export interface DatePickerProps {
  onChange?: (value: string) => void;
}

export interface DatePickerState {
  date: Date;
  isDatePickerVisible: boolean;
}

export default class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  constructor(props: DatePickerProps) {
    super(props);
    this.state = {
      date: new Date(),
      isDatePickerVisible: false,
    };
  }

  formatDate = (date: Date) => {
    return Moment(date).format(DatePickerFormat);
  };

  handleOutterChange = (date: Date) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(this.formatDate(date));
    }
  }

  handleChange = (date: Date) => {
    this.setState({
      date,
      isDatePickerVisible: false
    });
    this.handleOutterChange(date);
  };

  onClickPrevDay = () => {
    const { date } = this.state;
    const prevDate = new Date(date.getTime() - 86400000);
    this.setState({
      date: prevDate
    });
    this.handleOutterChange(prevDate);
  }

  onClickNextDay = () => {
    const { date } = this.state;
    const nextDate = new Date(date.getTime() + 86400000);
    this.setState({
      date: nextDate
    });
    this.handleOutterChange(nextDate);
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  public render() {
    const { date, isDatePickerVisible } = this.state;
    return (
      <React.Fragment>
        <View style={styles.wrap}>
          <Touchable style={styles.btnWrap} onPress={this.onClickPrevDay}>
            <Image style={RootStyles.iconStyleMD} source={require('@/assets/arrow-left.png')} />
            <Text style={styles.prevDayTxt}>前一天</Text>
          </Touchable>
          <Touchable style={styles.btnWrap} onPress={this.showDatePicker}>
            <Text style={styles.selectedDayTxt}>{this.formatDate(date)}</Text>
            <SarsIcoDown style={RootStyles.iconStyleMD} size={36} color='#999' />
          </Touchable>
          <Touchable style={styles.btnWrap} onPress={this.onClickNextDay}>
            <Text style={styles.nextDayTxt}>后一天</Text>
            <Image style={RootStyles.iconStyleMD} source={require('@/assets/arrow-right.png')} />
          </Touchable>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          date={date}
          onConfirm={this.handleChange}
          onCancel={this.hideDatePicker}
          cancelTextIOS='取消'
          confirmTextIOS='确定'
          headerTextIOS='选择日期'
          locale='zh'
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  selectedDayTxt: {
    color: '#FF3B03',
    paddingLeft: 20,
    paddingRight: 5,
  },
  prevDayTxt: {
    color: '#999999',
    paddingLeft: 5,
    paddingRight: 20,
  },
  nextDayTxt: {
    color: '#999999',
    paddingLeft: 20,
    paddingRight: 5,
  },
});
