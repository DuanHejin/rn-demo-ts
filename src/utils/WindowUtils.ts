import { Dimensions } from "react-native"

export const getWidth = (percentage: number = 100) => {
  const { width } = Dimensions.get('window');
  return Math.round((percentage * width) / 100);
}

export const getHeight = () => {
  return Math.round(Dimensions.get('window').height);
}