import * as React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export interface HeaderProps {
}

export interface HeaderState {
  searchTerm: string
}

export default class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  onSearchChange = (searchTerm: any) => {
    console.log('searchTerm :>> ', searchTerm);
    this.setState({ searchTerm })
  }

  public render() {
    const { searchTerm } = this.state;
    return (
      <View style={styles.wrap}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={this.onSearchChange}
          value={searchTerm}
          placeholder="type name to search..."
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
  }
});
