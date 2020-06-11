import * as React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { ItemInfo, getWidth } from '@/utils/index';
import { Card } from '@/components/index';
import { RootStackNavigation } from '@/navigator/StackNavigtor';

export interface BoomTodayProps {
  navigation: RootStackNavigation
}

export interface BoomTodayState {
  itemList: Array<ItemInfo> | undefined,
}

export default class BoomTodayComponent extends React.Component<BoomTodayProps, BoomTodayState> {
  constructor(props: BoomTodayProps) {
    super(props);
    this.state = {
      itemList: undefined
    };
  }

  componentDidMount() {
    const itemList = [{
      id: "1000",
      title: "【基地直采】黄瓜1根（约200 - 300g）",
      subTitle: "【产地直采，新鲜到家】",
      suTitleStyle: { color: "red" },
      // imgList: ,
      desc: "精品回归",
      leftBottomIcon: "@/assets/xsms.png",
      currentPrice: 0.79,
      originalPrice: 3.99,
      rightBottomMemo: "1000+人购买",
    }, {
      id: "1001",
      title: "【基地直采】黄瓜1根（约200 - 300g）",
      subTitle: "【产地直采，新鲜到家】",
      suTitleStyle: { color: "red" },
      // imgList: ,
      desc: "精品回归",
      leftBottomIcon: "@/assets/xsms.png",
      currentPrice: 0.79,
      originalPrice: 3.99,
      rightBottomMemo: "1000+人购买",
    }];
    this.setState({
      itemList
    })
  }

  onPress = (id: string) => () => {
    const { navigation } = this.props;
    navigation.navigate("ItemDetail", { id });
  }

  renderItem = (item: ItemInfo, index: number) => {
    return (
      <Card item={item} key={index} onPress={this.onPress(item.id)} />
    );
  }

  public render() {
    const { itemList } = this.state;
    return (
      <View style={styles.wrap}>
        {/* <FlatList ></FlatList> */}
        {
          itemList && itemList.map((item, index) => (this.renderItem(item, index)))
        }
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: getWidth(),
  },
});